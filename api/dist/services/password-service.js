"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class PasswordService {
    // private static _instance: PasswordService;
    // private static get instance(): PasswordService {
    //   if (!PasswordService._instance)
    //     PasswordService._instance = new PasswordService();
    //   return PasswordService._instance;
    // }
    constructor() { }
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            try {
                const salt = crypto_1.default.randomBytes(32).toString("hex");
                const hash = crypto_1.default
                    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
                    .toString("hex");
                return resolve({ salt, hash });
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    static verifyPasswordHash(password, hash, salt) {
        return new Promise((resolve, reject) => {
            if (password.trim() === "")
                return reject("Password is empty");
            if (salt.trim() === "")
                return reject("Salt is empty");
            if (hash.trim() === "")
                return reject("Hash is empty");
            try {
                const verifiedHash = crypto_1.default
                    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
                    .toString("hex");
                return resolve(verifiedHash === hash);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
}
exports.default = PasswordService;
//# sourceMappingURL=password-service.js.map