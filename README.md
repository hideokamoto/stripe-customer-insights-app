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

### 1. Install Stripe CLI and Apps Plugin

The Stripe Apps CLI is a plugin for the Stripe CLI (requires Stripe CLI >= 1.8.11).

**Install Stripe CLI:**
- **macOS (Homebrew)**: `brew install stripe/stripe-cli/stripe`
- **Linux**: Download from [Stripe CLI releases](https://github.com/stripe/stripe-cli/releases/latest)
- **Windows**: Download from [Stripe CLI releases](https://github.com/stripe/stripe-cli/releases/latest)

**Install the Apps plugin:**
```bash
stripe plugin install apps
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Authenticate Stripe CLI

```bash
stripe login
```

This will open your browser to authenticate with your Stripe account.

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
stripe-customer-insights-app/
├── stripe-app.json       # App manifest
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── icon.svg              # App icon
├── README.md             # Documentation (English)
├── README.ja.md          # Documentation (Japanese)
└── src/
    ├── views/
    │   └── CustomerInsights.tsx    # Main view component
    ├── components/
    │   ├── CustomerTable.tsx       # Customer table component
    │   └── FilterBar.tsx           # Filter bar component
    ├── hooks/
    │   └── useCustomerData.ts      # Custom hook for data fetching
    └── types/
        └── customer.ts             # TypeScript type definitions
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

## Architecture

This is a **Stripe Apps** implementation - a frontend-only application that runs directly in the Stripe Dashboard:

- ✅ No backend server required
- ✅ Hosted by Stripe (zero infrastructure costs)
- ✅ Stripe-managed authentication and security
- ✅ Native Stripe Dashboard integration
- ✅ Automatic updates and scaling

> **Note**: A legacy version (NestJS backend + React frontend) is preserved in the `legacy` branch for reference.

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
