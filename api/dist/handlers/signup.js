"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = require("../services/database-service");
class Signup {
    constructor() { }
}
exports.default = Signup;
Signup.handlePost = async (req, res) => {
    try {
        const UserModel = await database_service_1.DatabaseService.getModel();
    }
    catch (_a) {
    }
};
//# sourceMappingURL=signup.js.map