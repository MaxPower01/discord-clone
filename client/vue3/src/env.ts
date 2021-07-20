import Environment from "./common/enums/environment";

const isProd = process.env.NODE_ENV === "production";

const env = {
  ENVIRONMENT: isProd ? Environment.Prod : Environment.Dev,
  API_URL: isProd ? "" : "http://localhost:3001/api/v1"
};

export default env;
