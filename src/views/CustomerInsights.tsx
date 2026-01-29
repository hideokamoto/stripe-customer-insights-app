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
   * Filter customers based on search criteria (case-insensitive substring matching)
   */
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Filter by name (safe substring matching)
      if (filters.name) {
        const customerName = (customer.name || customer.metadata?.name || '').toLowerCase();
        const searchName = filters.name.toLowerCase();
        if (!customerName.includes(searchName)) return false;
      }

      // Filter by company (safe substring matching)
      if (filters.company) {
        const company = (customer.metadata?.company || '').toLowerCase();
        const searchCompany = filters.company.toLowerCase();
        if (!company.includes(searchCompany)) return false;
      }

      // Filter by email (safe substring matching)
      if (filters.email) {
        const email = customer.email.toLowerCase();
        const searchEmail = filters.email.toLowerCase();
        if (!email.includes(searchEmail)) return false;
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
