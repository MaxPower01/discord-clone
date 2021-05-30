import { DatabaseService } from "./services/database-service";
import express from "express";
import RouterService from "./services/router-service";

DatabaseService.connect()
  .then((dbConnection) => {
    console.log("Initializing app...");

    RouterService.registerRoutes();
    const app = express();
    app.use("/api/v1", RouterService.baseRouter);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
