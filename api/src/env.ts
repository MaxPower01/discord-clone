import Environment from "./common/enums/environment";
import dotenv from "dotenv";

dotenv.config();

const {
  ENVIRONMENT,
  API_SESSION_SECRET,
  API_PORT,
  DB_URI__DEV,
  DB_URI__PROD,
  CLIENT_URL__DEV,
  CLIENT_URL__PROD,
} = process.env;

const isProd = ENVIRONMENT === "production";

const env = {
  ENVIRONMENT: isProd ? Environment.Prod : Environment.Dev,
  PORT: API_PORT,
  SESSION_SECRET: API_SESSION_SECRET,
  DB_URI: isProd ? DB_URI__PROD : DB_URI__DEV,
  CLIENT_URL: isProd ? CLIENT_URL__PROD : CLIENT_URL__DEV,
};

export default env;
