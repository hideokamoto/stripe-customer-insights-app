import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { sequentialPromiseWithChunk } from '@hideokamoto/sequential-promise';

/**
 * Stripe customer data with charge data
 */
export interface CustomerWithCharge extends Stripe.Customer {
  charges: Stripe.Charge[];
}

@Injectable()
export class AppService {
  /**
   * Stripe SDK client
   */
  private readonly stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  /**
   * Load all stripe customers
   * @param startingAfter Customer id to list more customers
   * @param prevCustomers  Customers already fetched
   * @returns Loaded all customer data from Stripe
   */
  public async listAllCustomers(
    startingAfter?: string,
    prevCustomers: Stripe.Customer[] = [],
  ): Promise<Stripe.Customer[]> {
    const customers = await this.stripe.customers.list({
      limit: 100,
      starting_after: startingAfter,
    });
    const merged = [...prevCustomers, ...customers.data];
    if (customers.data.length < 100) {
      return merged;
    }
    return this.listAllCustomers(
      customers.data[customers.data.length - 1].id,
      merged,
    );
  }

  /**
   * Load the customer charges
   * @param customerId Stripe customer id
   * @param params Query parameters
   * @param options Stripe API request options
   * @returns Chage data of the customer (default: latest 100)
   */
  public async listCharges(
    params?: Stripe.ChargeListParams,
    options?: Stripe.RequestOptions,
  ) {
    const { data } = await this.stripe.charges.list(params, options);
    return data;
  }

  /**
   * List all charges of the customer
   * @param params Lists charge parameters
   * @param startingAfter Charge id to list more data
   * @param prevCharges Data already fetched
   * @returns All charge data
   */
  public async listAllCharges(
    params?: Omit<Stripe.ChargeListParams, 'starting_after'>,
    startingAfter?: string,
    prevCharges: Stripe.Charge[] = [],
  ): Promise<Stripe.Charge[]> {
    const charges = await this.listCharges({
      limit: 100,
      ...params,
      starting_after: startingAfter,
    });
    const merged = [...prevCharges, ...charges];
    if (charges.length < 100) {
      return merged;
    }
    return this.listAllCharges(params, charges[charges.length - 1].id, merged);
  }

  /**
   * List all customer and all charge data
   * @returns
   */
  public async listAllCustomersWithCharge(): Promise<CustomerWithCharge[]> {
    const customers = await this.listAllCustomers();
    const result = await sequentialPromiseWithChunk(
      customers,
      async (customer) => {
        const charges = await this.listAllCharges({ customer: customer.id });
        return {
          ...customer,
          charges,
        };
      },
      { chunkSize: Number(process.env.CHUNK_LOAD_SIZE) },
    );
    return result.flat();
  }
}
