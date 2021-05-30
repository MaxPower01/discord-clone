"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { v4 as uuid } from "uuid";
const jsonSchema_1 = require("../common/schemas/api/Signin/jsonSchema");
const validation_service_1 = __importDefault(require("../common/services/validation-service"));
const database_service_1 = require("../services/database-service");
const json_service_1 = __importDefault(require("../services/json-service"));
const password_service_1 = __importDefault(require("../services/password-service"));
class Signin {
    constructor() { }
}
exports.default = Signin;
Signin.handlePost = async (req, res) => {
    try {
        const { data, errors } = await validation_service_1.default.parseType(req.body, jsonSchema_1.schema);
        if (data === null)
            return res.status(400).json(json_service_1.default.createJsonResponse({
                success: false,
                errors,
            }));
        const { username, password } = data;
        const { UserModel } = database_service_1.DatabaseService;
        const user = await UserModel.findOne({ username });
        if (user === null)
            return res.status(401).json(json_service_1.default.createJsonResponse({
                success: false,
                msg: "Aucun utilisateur ne concorde à cet identifiant",
            }));
        const { hash, salt } = user;
        const validPassword = await password_service_1.default.verifyPasswordHash(password, hash, salt);
        if (validPassword)
            return res.status(200).json(json_service_1.default.createJsonResponse({
                success: true,
                extraParams: [
                    {
                        name: "user",
                        value: user,
                    },
                ],
            }));
        return res.status(401).json(json_service_1.default.createJsonResponse({
            success: false,
            msg: "Le mot de passe est incorrect",
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(200).json(json_service_1.default.createJsonResponse({
            success: false,
            error,
        }));
    }
};
//# sourceMappingURL=signin.js.map