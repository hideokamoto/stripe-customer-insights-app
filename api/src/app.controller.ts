import { Controller, Get } from '@nestjs/common';
import Stripe from 'stripe';
import { AppService, CustomerWithCharge } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Drop unuse data to reduce the response size
   */
  public formatChargeResponse(charges: Stripe.Charge[]) {
    return (
      charges
        // If you want to get only paid data, should uncomment
        //.filter((charge) => charge.paid)
        .map((charge) => {
          const {
            amount,
            created,
            currency,
            description,
            payment_method_details,
            status,
            metadata,
            paid,
          } = charge;
          return {
            amount,
            created,
            currency,
            description,
            payment_method_details,
            status,
            metadata,
            paid,
          };
        })
    );
  }

  /**
   * Drop unuse data to reduce the response size
   */
  public formatCustomerResponse(customers: CustomerWithCharge[]) {
    const response = customers.map((customer) => {
      const { id, created, email, metadata, currency, charges } = customer;
      return {
        id,
        created,
        email,
        metadata,
        currency,
        charges: charges ? this.formatChargeResponse(charges) : undefined,
      };
    });
    return response;
  }

  /**
   * Load all Stripe charges
   */
  @Get('charges')
  public async listCharges() {
    const data = await this.appService.listAllCharges();
    return this.formatChargeResponse(data);
  }
  /**
   * Load all Stripe charges
   */
  @Get('customers')
  public async listCustomers() {
    const data = await this.appService.listAllCustomers();
    return this.formatCustomerResponse(data);
  }

  /**
   *
   * Load all Stripe customer
   */
  @Get('top_customers')
  public async listTopCustomers() {
    const data = await this.appService.listAllCustomersWithCharge();
    const withAmountPaid = this.formatCustomerResponse(data).map((customer) => {
      const amountPaid = customer.charges.reduce((prev, current) => {
        if (!current.paid) return prev;
        return prev + current.amount;
      }, 0);
      return { ...customer, amount_paid: amountPaid };
    });
    const sortedCustoemr = withAmountPaid.sort((customerA, customerB) => {
      return customerA.amount_paid > customerB.amount_paid ? -1 : 1;
    });

    return sortedCustoemr;
  }
}
