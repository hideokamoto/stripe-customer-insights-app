# Stripe Customer Insights App

A Stripe App that provides customer payment insights and analytics directly within the Stripe Dashboard.

## Features

- 📊 **Customer Analytics**: View all customers with their payment history and insights
- 💰 **Payment Tracking**: See total amount paid by each customer
- 🔍 **Advanced Filtering**: Search customers by email, name, or company
- 📈 **Sorting**: Sort customers by various metrics (amount paid, date, etc.)
- ⚡ **Real-time Data**: Fetch latest customer data directly from Stripe API
- 🎯 **Dashboard Integration**: Native integration with Stripe Dashboard

## Technology Stack

- **Framework**: Stripe Apps Platform (UI Extensions)
- **Language**: TypeScript
- **UI Library**: Stripe UI Extension SDK
- **API**: Stripe API (Customers, Charges)

## Prerequisites

- Node.js >= 18.0.0
- Stripe account with API access
- Stripe Apps CLI

## Installation

### 1. Install Stripe Apps CLI

```bash
npm install -g @stripe/stripe-apps-cli
```

### 2. Install Dependencies

```bash
cd stripe-app
npm install
```

### 3. Authenticate with Stripe

```bash
stripe login
```

## Development

### Start Development Server

```bash
npm start
# or
stripe apps start
```

This will:
1. Build the app in watch mode
2. Start a local development server
3. Open the app in your Stripe Dashboard (test mode)

### Build for Production

```bash
npm run build
```

## Project Structure

```
stripe-app/
├── stripe-app.json       # App manifest
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── icon.svg              # App icon
├── src/
│   ├── views/
│   │   └── CustomerInsights.tsx    # Main view component
│   ├── components/
│   │   ├── CustomerTable.tsx       # Customer table component
│   │   └── FilterBar.tsx           # Filter bar component
│   ├── hooks/
│   │   └── useCustomerData.ts      # Custom hook for data fetching
│   └── types/
│       └── customer.ts             # TypeScript type definitions
└── README.md
```

## Usage

Once installed, the Customer Insights app will appear in your Stripe Dashboard:

1. Navigate to your Stripe Dashboard
2. Look for "Customer Insights" in the Apps section
3. Click to open the app
4. View customer data with payment insights
5. Use filters to search for specific customers
6. Click column headers to sort data

### Features in Detail

#### Customer Table
- **Email**: Customer email address
- **Company**: Company name from metadata
- **Name**: Customer name
- **Customer Source**: Source tracking from metadata
- **Amount Paid**: Total amount paid (in USD)
- **Created**: Customer creation date
- **Last Order Date**: Date of most recent charge
- **Last Order Status**: Status of most recent charge
- **Last Ordered Item**: Description of most recent charge

#### Filtering
- Search by customer email
- Search by customer name
- Search by company name
- Filters work together (AND logic)

#### Sorting
- Click any column header to sort
- Click again to reverse sort direction
- Sort indicators show current sort column and direction

## Deployment

### Upload to Stripe

```bash
stripe apps upload
```

### Submit to Stripe App Marketplace (Optional)

```bash
stripe apps submit
```

## Permissions

This app requires the following Stripe permissions:

- `customer_read`: To read customer data
- `charge_read`: To read payment charges
- `payment_intent_read`: To access payment intent information

## Comparison with Legacy Version

### Old Architecture (NestJS + React)
- Required separate backend server (NestJS)
- Required separate hosting infrastructure
- Manual authentication and security management
- Higher operational costs

### New Architecture (Stripe Apps)
- ✅ No backend server required
- ✅ Hosted by Stripe (zero infrastructure costs)
- ✅ Stripe-managed authentication and security
- ✅ Native Stripe Dashboard integration
- ✅ Automatic updates and scaling

## Migration Notes

This Stripe App is a complete rewrite of the original NestJS + React application:

**Key Changes:**
- Removed NestJS backend entirely
- Migrated from React Bootstrap to Stripe UI Toolkit
- Changed from Charges API to direct Stripe SDK usage
- Removed custom API endpoints
- Added native Stripe Dashboard integration

**Preserved Features:**
- All original customer filtering functionality
- Sorting capabilities
- Payment insights and analytics
- Customer metadata support

## Troubleshooting

### App not loading in Dashboard
- Make sure you're in test mode
- Check that `stripe apps start` is running
- Verify your Stripe CLI is authenticated

### Data not appearing
- Check Stripe API permissions in `stripe-app.json`
- Verify you have customers in your test account
- Check browser console for errors

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (must be >= 18.0.0)
- Verify TypeScript configuration

## License

MIT

## Support

For issues or questions:
- Check the [Stripe Apps documentation](https://stripe.com/docs/stripe-apps)
- Review the code comments for implementation details
- Open an issue in this repository

## Future Enhancements

Potential features for future versions:
- Customer segmentation and cohorts
- Revenue analytics charts
- Export to CSV functionality
- Customer lifetime value calculation
- Payment method insights
- Refund tracking
- Subscription analytics (if using Stripe Billing)
