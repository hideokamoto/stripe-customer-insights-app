# Example of Stripe customer insights dashboard app
You can see the lists of your customers on the example application.
The application will show...

- Top 100 customers (amount paid)

## Requirement

You need to get the following data or tools before starting the project.

- Stripe API keys
- Node v10+

## Getting started

### Step1: Clone the repository

### Step2: Put your Stripe API keys

Rename `.env.example` to `.env`.
And open this file to put your Stripe API Key data.

```
STRIPE_SECRET_API_KEY=sk_test_YOUR_API_KEY
CHUNK_LOAD_SIZE=7
```

### STEP3: Setup the API

```bash
# Move to API project directory
cd api

# Install dependencies
yarn

# Start the API
yarn start:dev
```

#### use npm instead

```bash
# Move to API project directory
cd api

# Install dependencies
npm install

# Start the API
npm run start:dev
```
