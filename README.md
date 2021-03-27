![Screenshot of app](https://i.ibb.co/r2W6FLs/scrnli-27-03-2021-06-48-59.png)

# JWT Authentication using access and refresh tokens

A repo for setting up authentication using Json Web Tokens

## Installing/Running locally

- Clone or fork repo

  ```bash
  - git clone <repo>
  - cd jwt-authentication
  - cd client && npm install
  - cd server && npm install
  ```

- Create/configure `.env` environment with credentials in sevrer folder. A sample `.env.example` file has been provided. Make a duplicate of `.env.sample` and rename to `.env`, then configure credentials.

- Run `npm run dev` in `server` to start the server and watch for changes
- Run `npm start` in `client` to start the client and watch for changes

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center/community) or [Mongo Atlas](https://www.mongodb.com/download-center/cloud)
