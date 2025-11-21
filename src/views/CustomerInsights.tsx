import { useState, useMemo } from 'react';
import {
  ContextView,
  Box,
  Button,
  Banner,
  Spinner,
  Inline,
} from '@stripe/ui-extension-sdk/ui';
import { useCustomerData } from '../hooks/useCustomerData';
import { CustomerTable } from '../components/CustomerTable';
import { FilterBar } from '../components/FilterBar';
import type { CustomerFilters } from '../types/customer';

/**
 * Main view component for Customer Insights
 */
export const CustomerInsights = () => {
  const { customers, loading, error, refetch } = useCustomerData();
  const [filters, setFilters] = useState<CustomerFilters>({
    email: '',
    name: '',
    company: '',
  });

  /**
   * Filter customers based on search criteria
   */
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Filter by name
      if (filters.name) {
        const customerName = customer.name || customer.metadata?.name || '';
        const nameMatch = new RegExp(filters.name, 'gi').test(customerName);
        if (!nameMatch) return false;
      }

      // Filter by company
      if (filters.company) {
        const company = customer.metadata?.company || '';
        const companyMatch = new RegExp(filters.company, 'gi').test(company);
        if (!companyMatch) return false;
      }

      // Filter by email
      if (filters.email) {
        const emailMatch = new RegExp(filters.email, 'gi').test(customer.email);
        if (!emailMatch) return false;
      }

      return true;
    });
  }, [customers, filters]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = (newFilters: CustomerFilters) => {
    setFilters(newFilters);
  };

  /**
   * Handle refetch
   */
  const handleRefetch = () => {
    refetch();
  };

  return (
    <ContextView title="Customer Insights">
      <Box
        css={{
          stack: 'y',
          gap: 'large',
          padding: 'large',
        }}
      >
        {/* Header with refresh button */}
        <Inline css={{ distribute: 'space-between', alignY: 'center' }}>
          <Box
            css={{
              font: 'heading',
              fontSize: 'xlarge',
              fontWeight: 'semibold',
            }}
          >
            Customer Payment Insights
          </Box>
          <Button
            type="primary"
            onPress={handleRefetch}
            disabled={loading}
          >
            Refresh Data
          </Button>
        </Inline>

        {/* Error message */}
        {error && (
          <Banner
            type="critical"
            title="Error loading customer data"
            description={error}
          />
        )}

        {/* Loading state */}
        {loading && (
          <Box
            css={{
              alignX: 'center',
              alignY: 'center',
              paddingY: 'xxlarge',
            }}
          >
            <Spinner size="large" />
          </Box>
        )}

        {/* Customer data */}
        {!loading && !error && (
          <>
            {/* Filter bar */}
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {/* Customer count */}
            <Box css={{ font: 'body', color: 'secondary' }}>
              Showing {filteredCustomers.length} of {customers.length} customers
            </Box>

            {/* Customer table */}
            {filteredCustomers.length > 0 ? (
              <CustomerTable customers={filteredCustomers} />
            ) : (
              <Box
                css={{
                  alignX: 'center',
                  paddingY: 'xxlarge',
                  font: 'body',
                  color: 'secondary',
                }}
              >
                No customers found matching the filter criteria
              </Box>
            )}
          </>
        )}
      </Box>
    </ContextView>
  );
};
