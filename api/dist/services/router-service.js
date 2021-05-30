"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const env_1 = __importDefault(require("../env"));
const database_service_1 = require("./database-service");
const password_service_1 = __importDefault(require("./password-service"));
const routes_1 = require("../common/enums/routes");
const signup_1 = __importDefault(require("../handlers/signup"));
class RouterService {
    constructor() {
        this._baseRouter = null;
        this._passport = null;
    }
    static get instance() {
        if (!RouterService._instance)
            RouterService._instance = new RouterService();
        return RouterService._instance;
    }
    static get baseRouter() {
        const { instance } = RouterService;
        if (instance._baseRouter === null) {
            instance._baseRouter = express_1.Router();
            RouterService.configBaseRouter(instance._baseRouter);
        }
        return instance._baseRouter;
    }
    static get passport() {
        const { instance } = RouterService;
        if (instance._passport === null) {
            instance._passport = passport_1.default;
            RouterService.configPassport(instance._passport);
        }
        return instance._passport;
    }
    static configBaseRouter(router) {
        const { passport } = RouterService;
        const { CLIENT_URL, SESSION_SECRET } = env_1.default;
        if (typeof SESSION_SECRET !== "string")
            throw new Error("Api's session secret is undefined");
        if (database_service_1.DatabaseService.sessionStore === null)
            throw new Error("Database session store is null");
        router.use(express_1.json());
        router.use(express_1.urlencoded({ extended: true }));
        router.use(cors_1.default({
            origin: CLIENT_URL,
            credentials: true,
        }));
        router.use(express_session_1.default({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            store: database_service_1.DatabaseService.sessionStore,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        }));
        router.use(passport.initialize());
        router.use(passport.session());
    }
    static async configPassport(passport) {
        const UserModel = await database_service_1.DatabaseService.getModel();
        const strategy = new passport_local_1.Strategy(async (username, password, cb) => {
            try {
                const user = await UserModel.findOne({ username });
                if (user === null)
                    return cb(null, null);
                const validPassword = password_service_1.default.validatePassword(password, user.hash, user.salt);
                if (validPassword === true)
                    return cb(null, user);
                return cb(null, null);
            }
            catch (error) {
                return cb(error, null);
            }
        });
        passport.use(strategy);
        passport.serializeUser((user, cb) => cb(null, user.id));
        passport.deserializeUser(async (id, cb) => {
            try {
                const user = await UserModel.findById(id);
                return cb(null, user);
            }
            catch (error) {
                console.log(error);
                return cb(error, null);
            }
        });
    }
    static registerRoutes() {
        const { baseRouter: router } = RouterService;
        router.post(routes_1.ApiRoute.Signup, signup_1.default.handlePost);
    }
}
exports.default = RouterService;
//# sourceMappingURL=router-service.js.map