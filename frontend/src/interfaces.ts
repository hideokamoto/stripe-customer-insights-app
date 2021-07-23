/**
 * The API response type
 */
export interface StripeTOPCustomer {
  email: string;
  amount_paid: number;
  currency?: string;
  created?: string;
  charges: Array<{
    amount: number;
    created: number;
    currency: string;
    description: string;
    status: string;
  }>;
  metadata: {
    company?: string;
    vip?: "true" | "false";
    name?: string;
    customer_source?: string;
  };
}
