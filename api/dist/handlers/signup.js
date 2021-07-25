"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { v4 as uuid } from "uuid";
const jsonSchema_1 = require("../common/schemas/api/Signup/jsonSchema");
const validation_service_1 = __importDefault(require("../common/services/validation-service"));
const database_service_1 = require("../services/database-service");
const json_service_1 = __importDefault(require("../services/json-service"));
const password_service_1 = __importDefault(require("../services/password-service"));
class Signup {
    constructor() { }
}
exports.default = Signup;
Signup.handlePost = async (req, res) => {
    try {
        const { data, errors } = await validation_service_1.default.parseType(req.body, jsonSchema_1.schema);
        if (data === null)
            return res.status(400).json(json_service_1.default.createJsonResponse({
                success: false,
                error: errors,
            }));
        const { username } = data;
        const { UserModel } = database_service_1.DatabaseService;
        // const UserModel = await DatabaseService.getModel<DatabaseSchema.User>();
        if ((await UserModel.findOne({ username })) !== null)
            return res.status(409).json(json_service_1.default.createJsonResponse({
                success: false,
                msg: "Ce nom d'utilisateur n'est pas disponible",
            }));
        console.log(`Creating user "${username}"...`);
        const { hash, salt } = await password_service_1.default.hashPassword(data.password);
        const user = await new UserModel({
            username,
            hash,
            salt,
        }).save();
        console.log(`Succesfully created user "${username}"`);
        return res.status(200).json(json_service_1.default.createJsonResponse({
            success: true,
            extraParams: [
                {
                    name: "user",
                    value: user,
                },
            ],
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
//# sourceMappingURL=signup.js.map