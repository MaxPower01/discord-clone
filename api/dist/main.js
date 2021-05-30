"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = require("./services/database-service");
const express_1 = __importDefault(require("express"));
const router_service_1 = __importDefault(require("./services/router-service"));
database_service_1.DatabaseService.connect()
    .then((dbConnection) => {
    console.log("Initializing app...");
    router_service_1.default.registerRoutes();
    const app = express_1.default();
    app.use("/api/v1", router_service_1.default.baseRouter);
})
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map