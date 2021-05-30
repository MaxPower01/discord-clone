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
    static validatePassword(password, hash, salt) {
        try {
            const verifiedHash = crypto_1.default
                .pbkdf2Sync(password, salt, 10000, 64, "sha512")
                .toString("hex");
            return verifiedHash === hash;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = PasswordService;
//# sourceMappingURL=password-service.js.map