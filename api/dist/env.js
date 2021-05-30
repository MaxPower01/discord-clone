"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./common/enums/environment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { ENVIRONMENT, API_SESSION_SECRET, API_PORT, DB_URI__DEV, DB_URI__PROD, CLIENT_URL__DEV, CLIENT_URL__PROD, } = process.env;
const isProd = ENVIRONMENT === "production";
const env = {
    ENVIRONMENT: isProd ? environment_1.default.Prod : environment_1.default.Dev,
    PORT: API_PORT,
    SESSION_SECRET: API_SESSION_SECRET,
    DB_URI: isProd ? DB_URI__PROD : DB_URI__DEV,
    CLIENT_URL: isProd ? CLIENT_URL__PROD : CLIENT_URL__DEV,
};
exports.default = env;
//# sourceMappingURL=env.js.map