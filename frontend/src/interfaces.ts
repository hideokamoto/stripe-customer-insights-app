
/**
 * The API response type
 */
 export interface StripeTOPCustomer {
    amount_paid: number;
    currency?: string;
    created?: string;
    charges: Array<{
      amount: number;
      created: number;
      currency: string;
      description: string;
      status: string;
    }>
  }
  