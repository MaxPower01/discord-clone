import { DatabaseService } from "./services/database-service";
import express from "express";
import RouterService from "./services/router-service";
import env from "./env";

DatabaseService.connect()
  .then((dbConnection) => {
    console.log("Initializing app...");

    RouterService.registerRoutes();
    const app = express();
    app.use("/api/v1", RouterService.baseRouter);

    const { PORT } = env;

    app.listen(PORT, () => {
      console.log(`App is listening on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
