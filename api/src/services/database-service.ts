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

  private _UserModel: mongoose.Model<DatabaseSchema.User, {}> | undefined;
  public static get UserModel(): mongoose.Model<DatabaseSchema.User, {}> {
    const { instance, connection } = DatabaseService;
    if (connection === null) throw new Error("Database connection is null");
    if (instance._UserModel == null) {
      const schema = new mongoose.Schema({
        username: {
          type: String,
          required: true,
        },
        hash: {
          type: String,
          required: true,
        },
        salt: {
          type: String,
          required: true,
        },
      });

      instance._UserModel = connection.model<DatabaseSchema.User>(
        "User",
        schema
      );
    }
    return instance._UserModel;
  }

  // public static getModel<T extends DatabaseSchema.Document>(): Promise<
  //   mongoose.Model<T, {}>
  // > {
  //   return new Promise((resolve, reject) => {
  //     try {
  //     } catch (error) {
  //       return reject();
  //     }
  //   });
  // }
}

export namespace DatabaseSchema {
  export interface Document extends mongoose.Document {
    id: string;
  }

  export interface User extends Document {
    username: string;
    hash: string;
    salt: string;
  }
}
