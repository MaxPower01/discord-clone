import Environment from "./common/enums/environment";
import dotenv from "dotenv";

dotenv.config();

const { ENVIRONMENT, API_SESSION_SECRET, DB_URI__DEV, DB_URI__PROD } =
  process.env;

const isProd = ENVIRONMENT === "production";

const env = {
  ENVIRONMENT: isProd ? Environment.Prod : Environment.Dev,
  SESSION_SECRET: API_SESSION_SECRET,
  DB_URI: isProd ? DB_URI__PROD : DB_URI__DEV,
};

export default env;
