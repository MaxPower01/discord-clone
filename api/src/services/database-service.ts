import { MongoClientOptions } from "mongodb";
import mongoose, { Connection as MongoDbConnection } from "mongoose";
import MongoStore from "connect-mongo";
import env from "../env";

interface DatabaseConnection extends MongoDbConnection {}

export class DatabaseService {
  private static _instance: DatabaseService;
  private static get instance(): DatabaseService {
    if (!DatabaseService._instance)
      DatabaseService._instance = new DatabaseService();
    return DatabaseService._instance;
  }

  private _connection: DatabaseConnection | null = null;
  public static get connection(): DatabaseConnection | null {
    const { instance } = DatabaseService;
    return instance._connection;
  }

  private _sessionStore: MongoStore | null = null;
  public static get sessionStore(): MongoStore | null {
    const { instance } = DatabaseService;
    return instance._sessionStore;
  }

  private constructor() {}

  private static createConnection = (): Promise<DatabaseConnection> => {
    return new Promise(async (resolve, reject) => {
      const options: MongoClientOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      const { DB_URI } = env;
      if (DB_URI == null || DB_URI.trim() === "")
        return reject("DB_URI is null or empty");

      try {
        const { instance } = DatabaseService;
        const connection = await mongoose.createConnection(DB_URI, options);
        instance._connection = connection;
        instance._sessionStore = new MongoStore({
          collectionName: "sessions",
          client: connection.getClient(),
        });
        return resolve(connection);
      } catch (error) {
        return reject(error);
      }
    });
  };

  public static connect = (): Promise<DatabaseConnection> => {
    console.log("Connecting to database...");

    return new Promise(async (resolve, reject) => {
      if (DatabaseService.connection !== null) {
        console.log("Successfully connected using an existing connection");
        return resolve(DatabaseService.connection);
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

  public static getModel<T extends DatabaseSchemas.Document>(): Promise<
    mongoose.Model<T, {}>
  > {
    return new Promise((resolve, reject) => {
      return reject();
    });
  }
}

export namespace DatabaseSchemas {
  export interface Document extends mongoose.Document {}

  export interface User extends Document {
    id: string;
    username: string;
    hash: string;
    salt: string;
  }
}
