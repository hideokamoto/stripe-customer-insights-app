import { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@stripe/ui-extension-sdk/ui';
import type { CustomerWithInsights, SortConfig } from '../types/customer';

interface CustomerTableProps {
  customers: CustomerWithInsights[];
}

/**
 * Format date from unix timestamp
 */
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format amount with currency (amount is in cents, same as original implementation)
 */
const formatAmount = (amount: number, currency?: string): string => {
  const currencyCode = (currency || 'usd').toUpperCase();
  return `${amount ? amount.toLocaleString() : 0} ${currencyCode}`;
};

/**
 * Customer table component with sorting
 */
export function CustomerTable({ customers }: CustomerTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'amount_paid',
    direction: 'desc',
  });

  /**
   * Handle column sorting
   */
  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  /**
   * Sort customers based on current sort configuration
   */
  const sortedCustomers = useMemo(() => {
    const sorted = [...customers];

    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortConfig.key) {
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'company':
          aValue = a.metadata?.company || '';
          bValue = b.metadata?.company || '';
          break;
        case 'name':
          aValue = a.metadata?.name || a.name || '';
          bValue = b.metadata?.name || b.name || '';
          break;
        case 'amount_paid':
          aValue = a.amount_paid;
          bValue = b.amount_paid;
          break;
        case 'created':
          aValue = a.created;
          bValue = b.created;
          break;
        case 'lastOrderDate':
          // charges[0] is the most recent charge because useCustomerData sorts charges by created descending
          aValue = a.charges[0]?.created || 0;
          bValue = b.charges[0]?.created || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [customers, sortConfig]);

  /**
   * Get sort indicator
   */
  const getSortIndicator = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <Box css={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader onClick={() => handleSort('email')}>
              Email{getSortIndicator('email')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('company')}>
              Company{getSortIndicator('company')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('name')}>
              Name{getSortIndicator('name')}
            </TableHeader>
            <TableHeader>Customer Source</TableHeader>
            <TableHeader onClick={() => handleSort('amount_paid')}>
              Amount Paid{getSortIndicator('amount_paid')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('created')}>
              Created{getSortIndicator('created')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('lastOrderDate')}>
              Last Order Date{getSortIndicator('lastOrderDate')}
            </TableHeader>
            <TableHeader>Last Order Status</TableHeader>
            <TableHeader>Last Ordered Item</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => {
            const lastCharge = customer.charges[0];
            const customerName = customer.metadata?.name || customer.name || '-';
            const company = customer.metadata?.company || '-';
            const customerSource = customer.metadata?.customer_source
              ? customer.metadata.customer_source.replace(/_/g, ' ')
              : '-';

            return (
              <TableRow key={customer.id}>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{customerName}</TableCell>
                <TableCell>{customerSource}</TableCell>
                <TableCell>{formatAmount(customer.amount_paid, customer.currency)}</TableCell>
                <TableCell>{formatDate(customer.created)}</TableCell>
                <TableCell>
                  {lastCharge ? formatDate(lastCharge.created) : '-'}
                </TableCell>
                <TableCell>{lastCharge?.status || '-'}</TableCell>
                <TableCell>{lastCharge?.description || '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
