"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonService {
    constructor() { }
    static createJsonResponse(params) {
        const { success, msg, error, extraParams } = params;
        let result = {
            success,
            msg: msg !== null && msg !== void 0 ? msg : null,
            error,
        };
        if (extraParams !== null && extraParams !== undefined) {
            extraParams.forEach((extraParam) => {
                result[extraParam.name] = extraParam.value;
            });
        }
        return result;
    }
}
exports.default = JsonService;
//# sourceMappingURL=json-service.js.map