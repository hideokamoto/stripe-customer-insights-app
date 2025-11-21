import type Stripe from 'stripe';

/**
 * Customer with enriched data
 */
export interface CustomerWithInsights {
  id: string;
  name?: string;
  email: string;
  amount_paid: number; // Amount in cents (not converted to dollars)
  currency?: string;
  created: number;
  charges: Stripe.Charge[];
  metadata: {
    company?: string;
    vip?: 'true' | 'false';
    name?: string;
    customer_source?: string;
  };
}

/**
 * Filter state for customer table
 */
export interface CustomerFilters {
  email: string;
  name: string;
  company: string;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  key: keyof CustomerWithInsights | 'company' | 'customerName' | 'lastOrderDate';
  direction: 'asc' | 'desc';
}

/**
 * Customer table column definition
 */
export interface CustomerColumn {
  header: string;
  accessor: (customer: CustomerWithInsights) => string | number;
  sortable?: boolean;
  formatter?: (value: any) => string;
}
