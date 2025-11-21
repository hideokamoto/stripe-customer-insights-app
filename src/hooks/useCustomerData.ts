import { useState, useEffect, useCallback } from 'react';
import { STRIPE_API_KEY, createStripeClient } from '@stripe/ui-extension-sdk/stripe';
import type { CustomerWithInsights } from '../types/customer';
import type Stripe from 'stripe';

/**
 * Custom hook to fetch and manage customer data with payment insights
 */
export function useCustomerData() {
  const [customers, setCustomers] = useState<CustomerWithInsights[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calculate total amount paid by customer from charges
   * Returns the amount in cents (same as original implementation)
   */
  const calculateAmountPaid = (charges: Stripe.Charge[]): number => {
    return charges
      .filter((charge) => charge.paid)
      .reduce((total, charge) => total + charge.amount, 0);
  };

  /**
   * Fetch all customers with their charge data
   */
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stripe = createStripeClient(STRIPE_API_KEY);

      // Fetch all customers (with auto-pagination)
      const allCustomers: Stripe.Customer[] = [];
      for await (const customer of stripe.customers.list({ limit: 100 })) {
        allCustomers.push(customer);
      }

      // Fetch charges for each customer
      const customersWithInsights: CustomerWithInsights[] = [];

      // Process customers in chunks to avoid rate limiting
      const chunkSize = 14;
      for (let i = 0; i < allCustomers.length; i += chunkSize) {
        const chunk = allCustomers.slice(i, i + chunkSize);

        const chunkPromises = chunk.map(async (customer) => {
          try {
            // Fetch charges for this customer
            const charges: Stripe.Charge[] = [];
            for await (const charge of stripe.charges.list({
              customer: customer.id,
              limit: 100,
            })) {
              charges.push(charge);
            }

            // Sort charges by created date (newest first)
            charges.sort((a, b) => b.created - a.created);

            const customerWithInsights: CustomerWithInsights = {
              id: customer.id,
              name: customer.name || undefined,
              email: customer.email || '',
              amount_paid: calculateAmountPaid(charges),
              currency: charges[0]?.currency || 'usd',
              created: customer.created,
              charges,
              metadata: {
                company: customer.metadata?.company,
                vip: customer.metadata?.vip as 'true' | 'false' | undefined,
                name: customer.metadata?.name,
                customer_source: customer.metadata?.customer_source,
              },
            };

            return customerWithInsights;
          } catch (err) {
            console.error(`Failed to fetch charges for customer ${customer.id}:`, err);
            // Return customer with empty charges if fetch fails
            return {
              id: customer.id,
              name: customer.name || undefined,
              email: customer.email || '',
              amount_paid: 0,
              created: customer.created,
              charges: [],
              metadata: {
                company: customer.metadata?.company,
                vip: customer.metadata?.vip as 'true' | 'false' | undefined,
                name: customer.metadata?.name,
                customer_source: customer.metadata?.customer_source,
              },
            };
          }
        });

        const chunkResults = await Promise.all(chunkPromises);
        customersWithInsights.push(...chunkResults);

        // Small delay between chunks to avoid rate limiting
        if (i + chunkSize < allCustomers.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      // Sort by amount paid (descending)
      customersWithInsights.sort((a, b) => b.amount_paid - a.amount_paid);

      setCustomers(customersWithInsights);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch customer data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customer data');
      setLoading(false);
    }
  }, []);

  /**
   * Refetch customer data
   */
  const refetch = useCallback(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Initial fetch
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    refetch,
  };
}
