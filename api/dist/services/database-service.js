"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const env_1 = __importDefault(require("../env"));
class DatabaseService {
    constructor() {
        this._connection = null;
        this._sessionStore = null;
    }
    static get instance() {
        if (!DatabaseService._instance)
            DatabaseService._instance = new DatabaseService();
        return DatabaseService._instance;
    }
    get connection() {
        return this._connection;
    }
    get sessionStore() {
        return this._sessionStore;
    }
}
exports.default = DatabaseService;
DatabaseService.createConnection = () => {
    return new Promise(async (resolve, reject) => {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const { DB_URI } = env_1.default;
        if (DB_URI == null || DB_URI.trim() === "")
            return reject("DB_URI is empty");
        try {
            const connection = await mongoose_1.default.createConnection(DB_URI, options);
            DatabaseService.instance._connection = connection;
            DatabaseService.instance._sessionStore = new connect_mongo_1.default({
                collectionName: "sessions",
                client: connection.getClient(),
            });
            return resolve(connection);
        }
        catch (error) {
            return reject(error);
        }
    });
};
DatabaseService.connect = () => {
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
        }
        catch (error) {
            console.log("Unable to connect");
            return reject(error);
        }
    });
};
//# sourceMappingURL=database-service.js.map