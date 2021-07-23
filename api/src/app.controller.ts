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
          } = charge;
          return {
            amount,
            created,
            currency,
            description,
            payment_method_details,
            status,
            metadata,
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
        charges: this.formatChargeResponse(charges),
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
   *
   * Load all Stripe customer
   */
  @Get('customers')
  public async listCustomers() {
    const data = await this.appService.listAllCustomersWithCharge();
    return this.formatCustomerResponse(data);
  }
}
