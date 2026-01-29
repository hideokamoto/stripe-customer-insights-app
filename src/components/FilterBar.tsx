import { Box, TextField, Inline } from '@stripe/ui-extension-sdk/ui';
import type { CustomerFilters } from '../types/customer';

interface FilterBarProps {
  filters: CustomerFilters;
  onFilterChange: (filters: CustomerFilters) => void;
}

/**
 * Filter bar component for customer search
 */
export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleEmailChange = (value: string) => {
    onFilterChange({ ...filters, email: value });
  };

  const handleNameChange = (value: string) => {
    onFilterChange({ ...filters, name: value });
  };

  const handleCompanyChange = (value: string) => {
    onFilterChange({ ...filters, company: value });
  };

  return (
    <Box
      css={{
        padding: 'medium',
        backgroundColor: 'container',
        borderRadius: 'medium',
        marginBottom: 'large',
      }}
    >
      <Inline css={{ gap: 'medium', alignItems: 'flex-end' }}>
        <TextField
          label="Search by email"
          placeholder="Enter email address"
          value={filters.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <TextField
          label="Search by name"
          placeholder="Enter customer name"
          value={filters.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <TextField
          label="Search by company"
          placeholder="Enter company name"
          value={filters.company}
          onChange={(e) => handleCompanyChange(e.target.value)}
        />
      </Inline>
    </Box>
  );
}
