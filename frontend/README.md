# Stripe Customer insight frontend application

Example customer insight application using React, react-table, and bootstrap.

## Requirement

- Node v10+

### [Optional] Configure the `/front/.env` file

If you change the `API_PORT_NUMBER` or deployed the API to any hosting services like Heroku / AWS / GCP, you need to copy the `/front/.env.example` to `/front/.env`.
You need to update these environment variables to fetch your running API.

|Name|Used in|Description|Required (Default value)|
|:--|:--|:--|:--|
|REACT_APP_API_URL| Frontend | What the API should we call. | Not required ( default is `http://localhost:3100`) |

## Start React application (use Yarn)

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

## Start React application (use npm)

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
