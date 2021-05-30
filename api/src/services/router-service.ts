import { Router, json, urlencoded } from "express";
import session from "express-session";
import cors from "cors";
import passport, { PassportStatic } from "passport";
import env from "../env";
import { Strategy } from "passport-local";
import { DatabaseService } from "./database-service";
import PasswordService from "./password-service";
import { ApiRoute as Route } from "../common/enums/routes";
import Signup from "../handlers/signup";
import Signin from "../handlers/signin";

export default class RouterService {
  private static _instance: RouterService;
  private static get instance(): RouterService {
    if (!RouterService._instance) RouterService._instance = new RouterService();
    return RouterService._instance;
  }

  private _baseRouter: Router | null = null;
  public static get baseRouter(): Router {
    const { instance } = RouterService;
    if (instance._baseRouter === null) {
      instance._baseRouter = Router();
      RouterService.configBaseRouter(instance._baseRouter);
    }
    return instance._baseRouter;
  }

  private _passport: PassportStatic | null = null;
  public static get passport(): PassportStatic {
    const { instance } = RouterService;
    if (instance._passport === null) {
      instance._passport = passport;
      RouterService.configPassport(instance._passport);
    }
    return instance._passport;
  }

  private constructor() {}

  private static configBaseRouter(router: Router) {
    const { passport } = RouterService;
    const { CLIENT_URL, SESSION_SECRET } = env;

    if (typeof SESSION_SECRET !== "string")
      throw new Error("Api's session secret is undefined");

    if (DatabaseService.sessionStore === null)
      throw new Error("Database session store is null");

    router.use(json());
    router.use(urlencoded({ extended: true }));
    router.use(
      cors({
        origin: CLIENT_URL,
        credentials: true,
      })
    );
    router.use(
      session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: DatabaseService.sessionStore,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );
    router.use(passport.initialize());
    router.use(passport.session());
  }

  private static async configPassport(passport: PassportStatic) {
    // TODO : Unhandled promise rejection

    try {
      const { UserModel } = DatabaseService;
      // const UserModel = await DatabaseService.getModel<DatabaseSchema.User>();
      const strategy = new Strategy(async (username, password, cb) => {
        UserModel.findOne({ username })
          .then(async (user) => {
            if (user === null) return cb(null, null);
            const passwordHashIsValid =
              await PasswordService.verifyPasswordHash(
                password,
                user.hash,
                user.salt
              );
            if (passwordHashIsValid) return cb(null, user);
            return cb(null, null);
          })
          .catch((error) => {
            console.log(error);

            return cb(error, null);
          });
      });
      passport.use(strategy);
      passport.serializeUser((user, cb) => cb(null, user.id));
      passport.deserializeUser(async (id, cb) => {
        UserModel.findById(id)
          .then((user) => {
            return cb(null, user);
          })
          .catch((error) => {
            console.log(error);
            return cb(error, null);
          });
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  public static registerRoutes() {
    const { baseRouter: router } = RouterService;

    router.post(Route.Signup, Signup.handlePost);
    router.post(Route.Signin, Signin.handlePost);
  }
}
