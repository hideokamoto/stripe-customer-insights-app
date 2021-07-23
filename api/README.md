# Stripe Customer insight API server

Example API server project using NestJS.

## Requirement

You need to get the following data or tools before starting the project.

- Stripe API keys
- Node v10+

## How to run

### Put your Stripe API keys

Rename `.env.example` to `.env`.
And open this file to put your Stripe API Key data.

|Name|Used in|Description|Required (Default value)|
|:--|:--|:--|:--|
|STRIPE_SECRET_API_KEY|API|Stripe API key like sk_test_YOUR_API_KEY. | Required |
|CHUNK_LOAD_SIZE|API| To avoid Stripe API throttling, create a chunk to call API sequentially.|Not Required (default is `7`)|
|API_PORT_NUMBER|API|Select the API port number|Not required (default is `3100`)|

### Setup the API

```bash
# Move to API project directory
cd api

# Install dependencies
yarn

# Start the API
yarn start:dev
```

### use npm instead

```bash
# Move to API project directory
cd api

# Install dependencies
npm install

# Start the API
npm run start:dev
```

### Check the API response by using cURL

You can test the API by the following command.

```bash
% curl http://localhost:3100/top_customers | jq . | head -n 30
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 53727  100 53727    0     0  8744k      0 --:--:-- --:--:-- --:--:-- 8744k
[
  {
    "id": "cus_Cemxxxxxxxxxxx",
    "created": 1523390097,
    "email": "methodologies@example.com",
    "metadata": {
      "customer_source": "product_hunt"
    },
    "currency": "usd"
  },
  {
    "id": "cus_Cemxxxxxxxxxxx",
    "created": 1523390097,
    "email": "IntelligentPlasticPizza@example.com",
    "metadata": {
      "customer_source": "twitter",
      "vip": "true",
      "company": "IBM"
    },
    "currency": null
  },
  {
    "id": "cus_Cemxxxxxxxxxxx",
    "created": 1523390097,
    "email": "SQL@example.org",
    "metadata": {
      "customer_source": "mailing_list"
    },
    "currency": null
```