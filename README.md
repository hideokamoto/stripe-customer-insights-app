# Stripe Customer Insights Dashboard App

> **🎉 NEW: Stripe Apps Version Available!**
> This repository now includes a modern Stripe Apps version with native Stripe Dashboard integration.
> See the [`stripe-app/`](./stripe-app) directory for the new implementation.

You can see the lists of your customers on the example application.

<img width="1256" alt="スクリーンショット 2021-07-24 1 26 54" src="https://user-images.githubusercontent.com/6883571/126812641-f1f9e5c1-455b-4a17-b5fe-187942e70725.png">

## Features

- Show the list of all customers
- Sort by the amount paid, last charged date, and more
- Filter by name or company name on the metadata, or email address
- Show the last charge status

## 📦 Two Versions Available

### 🆕 Stripe Apps Version (Recommended)
**Location:** [`stripe-app/`](./stripe-app)

**Benefits:**
- ✅ Native Stripe Dashboard integration
- ✅ No backend server required
- ✅ Zero infrastructure costs
- ✅ Stripe-managed authentication and security
- ✅ Modern TypeScript + React 18
- ✅ Stripe UI Extension SDK

**Tech Stack:**
- Stripe Apps Platform
- TypeScript
- React 18
- Stripe UI Extension SDK

👉 **[Get Started with Stripe Apps Version →](./stripe-app/README.md)**

### 🔧 Legacy Version (NestJS + React)
**Location:** `api/` and `frontend/`

**Tech Stack:**
- Backend: NestJS + TypeScript
- Frontend: React 17 + React Bootstrap
- Requires separate hosting

**Note:** This version is maintained for reference but the Stripe Apps version is recommended for new deployments.

---

## 🔧 Legacy Version Setup (NestJS + React)

> **Note:** The Stripe Apps version is recommended for new projects. This section documents the legacy standalone version.

### Requirement

You need to get the following data or tools before starting the project.

- Stripe API keys
- Node v10+

## Getting started

### Step1: Clone the repository

### Step2: Put your Stripe API keys

Rename `api/.env.example` to `api/.env`.
And open this file to put your Stripe API Key data.

|Name|Used in|Description|Required (Default value)|
|:--|:--|:--|:--|
|STRIPE_SECRET_API_KEY|API|Stripe API key like sk_test_YOUR_API_KEY. | Required |
|CHUNK_LOAD_SIZE|API| To avoid Stripe API throttling, create a chunk to call API sequentially.|Not Required (default is `7`)|
|API_PORT_NUMBER|API|Select the API port number|Not required (default is `3100`)|

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

#### Check the API response by using cURL

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

### STEP4: Launch React application

In the `front` directory, we can run React application to visualize the customer data that get from the API.

#### [Optional] Configure the `/front/.env` file

If you change the `API_PORT_NUMBER` or deployed the API to any hosting services like Heroku / AWS / GCP, you need to copy the `/front/.env.example` to `/front/.env`.
You need to update these environment variables to fetch your running API.

|Name|Used in|Description|Required (Default value)|
|:--|:--|:--|:--|
|REACT_APP_API_URL| Frontend | What the API should we call. | Not required ( default is `http://localhost:3100`) |

#### Start React application

```bash
# Move to Frontend project directory
cd front

# Install dependencies
yarn

# Start the application
yarn start

Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.000:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Or you can use npm instead of Yarn.

```bash
# Move to Frontend project directory
cd front

# Install dependencies
npm install

# Start the API
npm run start
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.000:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```
