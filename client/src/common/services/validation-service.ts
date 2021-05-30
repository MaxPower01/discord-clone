// This file was generated with a tool.
// Any changes made to this file will be lost when it is generated again.

// Path : C:\Users\mmaxi\Documents\GitHub\discord-clone\common\src\services\validation-service.ts

import Ajv, { DefinedError } from "ajv";

export default class ValidationService {
  private static _instance: ValidationService;
  private static get instance(): ValidationService {
    if (!ValidationService._instance)
      ValidationService._instance = new ValidationService();
    return ValidationService._instance;
  }

  private _jsonValidator: Ajv | null = null;
  private static get jsonValidator(): Ajv {
    const { instance } = ValidationService;
    if (instance._jsonValidator === null)
      instance._jsonValidator = new Ajv({
        allowUnionTypes: true,
      });
    return instance._jsonValidator;
  }

  // eslint-disable-next-line no-control-regex
  private static emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  private static passwordRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$"
  );
  private static usernameRegex = /[^A-Za-z0-9]+/;

  private constructor() {}

  private static validateUsername = (
    username: string
  ): { isValid: boolean; error: string } => {
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
        error:
          "Le nom d'utilisateur ne doit contenir que des lettres majuscules et minuscules et des chiffres",
      };
    else
      return {
        isValid: true,
        error: "",
      };
  };

  public static validateEmail = (
    email: string
  ): { isValid: boolean; error: string } => {
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

  public static validatePassword = (
    password: string
  ): { isValid: boolean; error: string } => {
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
        error:
          "Le mot de passe doit inclure des lettres majuscules et minuscules ainsi que des chiffres",
      };
  };

  public static validateUserInput = (
    type: "email" | "password" | "username",
    value: string
  ): {
    isValid: boolean;
    error: string;
  } => {
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

  public static parseType<T>(
    objectToParse: any,
    jsonSchema: any
  ): { data: T | null; errors: DefinedError[] | null } {
    try {
      if (objectToParse == null || jsonSchema == null)
        return {
          data: null,
          errors: null,
        };

      const validate = ValidationService.jsonValidator.compile<T>(jsonSchema);
      const isValid = validate(objectToParse);

      if (isValid)
        return {
          data: objectToParse as T,
          errors: null,
        };

      return {
        data: null,
        errors: validate.errors as DefinedError[],
      };
    } catch (error) {
      console.log(error);

      return {
        data: null,
        errors: null,
      };
    }
  }
}
