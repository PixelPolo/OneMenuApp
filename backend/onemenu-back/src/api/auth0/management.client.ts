// https://www.npmjs.com/package/auth0

/*
The Auth0 Management API is meant to be used by 
back-end servers or trusted parties performing administrative tasks. 
Generally speaking, anything that can be done through the Auth0 dashboard 
(and more) can also be done through this API.
 */

import { ManagementClient } from "auth0";
import dotenv from "dotenv";

// Environment vars
dotenv.config();

export const managementClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});
