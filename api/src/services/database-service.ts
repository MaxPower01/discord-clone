import { MongoClientOptions } from "mongodb";
import mongoose, { Connection as MongoDbConnection } from "mongoose";
import MongoStore from "connect-mongo";
import env from "../env";

interface DbConnection extends MongoDbConnection {}

export default class DatabaseService {
  private static _instance: DatabaseService;
  public static get instance(): DatabaseService {
    if (!DatabaseService._instance)
      DatabaseService._instance = new DatabaseService();
    return DatabaseService._instance;
  }

  private _connection: DbConnection | null = null;
  public get connection(): DbConnection | null {
    return this._connection;
  }

  private _sessionStore: MongoStore | null = null;
  public get sessionStore(): MongoStore | null {
    return this._sessionStore;
  }

  private static createConnection = (): Promise<DbConnection> => {
    return new Promise(async (resolve, reject) => {
      const options: MongoClientOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      const { DB_URI } = env;
      if (DB_URI == null || DB_URI.trim() === "")
        return reject("DB_URI is empty");

      try {
        const connection = await mongoose.createConnection(DB_URI, options);
        DatabaseService.instance._connection = connection;
        DatabaseService.instance._sessionStore = new MongoStore({
          collectionName: "sessions",
          client: connection.getClient(),
        });
        return resolve(connection);
      } catch (error) {
        return reject(error);
      }
    });
  };

  public static connect = (): Promise<DbConnection> => {
    console.log("Connecting to database...");

    return new Promise(async (resolve, reject) => {
      const { connection } = DatabaseService.instance;
      if (connection !== null) {
        console.log("Successfully connected using an existing connection");
        return resolve(connection);
      }

      try {
        const newConnection = await DatabaseService.createConnection();
        console.log("Successfully connected by creating a new connection");
        return resolve(newConnection);
      } catch (error) {
        console.log("Unable to connect");
        return reject(error);
      }
    });
  };
}
