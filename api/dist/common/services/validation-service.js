"use strict";
// This file was generated with a tool.
// Any changes made to this file will be lost when it is generated again.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Path : D:\Documents\GitHub\discord-clone\common\src\services\validation-service.ts
const ajv_1 = __importDefault(require("ajv"));
class ValidationService {
    constructor() {
        this._jsonValidator = null;
    }
    static get instance() {
        if (!ValidationService._instance)
            ValidationService._instance = new ValidationService();
        return ValidationService._instance;
    }
    static get jsonValidator() {
        const { instance } = ValidationService;
        if (instance._jsonValidator === null)
            instance._jsonValidator = new ajv_1.default({
                allowUnionTypes: true,
            });
        return instance._jsonValidator;
    }
    static parseType(objectToParse, jsonSchema) {
        try {
            if (objectToParse == null || jsonSchema == null)
                return {
                    data: null,
                    errors: null,
                };
            const validate = ValidationService.jsonValidator.compile(jsonSchema);
            const isValid = validate(objectToParse);
            if (isValid)
                return {
                    data: objectToParse,
                    errors: null,
                };
            return {
                data: null,
                errors: validate.errors,
            };
        }
        catch (error) {
            console.log(error);
            return {
                data: null,
                errors: null,
            };
        }
    }
}
exports.default = ValidationService;
// eslint-disable-next-line no-control-regex
ValidationService.emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
ValidationService.passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$");
ValidationService.usernameRegex = /[^A-Za-z0-9]+/;
ValidationService.validateUsername = (username) => {
    if (username.trim() === "")
        return {
            isValid: false,
            error: "Le nom d'utilisateur ne peut pas être vide",
        };
    else if (username.trim().length < 6)
        return {
            isValid: false,
            error: "Le nom d'utilisateur doit contenir au moins 6 caractères",
        };
    else if (username.match(ValidationService.usernameRegex))
        return {
            isValid: false,
            error: "Le nom d'utilisateur ne doit contenir que des lettres majuscules et minuscules et des chiffres",
        };
    else
        return {
            isValid: true,
            error: "",
        };
};
ValidationService.validateEmail = (email) => {
    if (email.trim() === "")
        return {
            isValid: false,
            error: "L'adresse courriel ne peut pas être vide",
        };
    else if (email.match(ValidationService.emailRegex))
        return {
            isValid: true,
            error: "",
        };
    else
        return {
            isValid: false,
            error: "L'adresse courriel n'est pas valide",
        };
};
ValidationService.validatePassword = (password) => {
    if (password.trim() === "")
        return {
            isValid: false,
            error: "Le mot de passe ne peut pas être vide",
        };
    else if (password.trim().length < 8)
        return {
            isValid: false,
            error: "Le mot de passe doit contenir au moins 8 caractères",
        };
    else if (password.match(ValidationService.passwordRegex))
        return {
            isValid: true,
            error: "",
        };
    else
        return {
            isValid: false,
            error: "Le mot de passe doit inclure des lettres majuscules et minuscules ainsi que des chiffres",
        };
};
ValidationService.validateUserInput = (type, value) => {
    switch (type) {
        case "email":
            return ValidationService.validateEmail(value);
        case "password":
            return ValidationService.validatePassword(value);
        case "username":
            return ValidationService.validateUsername(value);
        default:
            return { isValid: false, error: "" };
    }
};
//# sourceMappingURL=validation-service.js.map