"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = require("./services/database-service");
const express_1 = __importDefault(require("express"));
const router_service_1 = __importDefault(require("./services/router-service"));
const env_1 = __importDefault(require("./env"));
database_service_1.DatabaseService.connect()
    .then((dbConnection) => {
    console.log("Initializing app...");
    const app = express_1.default();
    router_service_1.default.registerRoutes();
    app.use("/api/v1", router_service_1.default.baseRouter);
    const { PORT } = env_1.default;
    app.listen(PORT, () => {
        console.log(`App is listening on port ${env_1.default.PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map