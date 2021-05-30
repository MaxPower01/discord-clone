import { RequestHandler } from "express";
// import { v4 as uuid } from "uuid";
import { schema } from "../common/schemas/api/Signin/jsonSchema";
import { Schema } from "../common/schemas/api/Signin/schema";
import ValidationService from "../common/services/validation-service";
import { DatabaseService } from "../services/database-service";
import JsonService from "../services/json-service";
import PasswordService from "../services/password-service";

export default class Signin {
  private constructor() {}

  public static handlePost: RequestHandler = async (req, res) => {
    try {
      const { data, errors } = await ValidationService.parseType<Schema>(
        req.body,
        schema
      );
      if (data === null)
        return res.status(400).json(
          JsonService.createJsonResponse({
            success: false,
            errors,
          })
        );

      const { username, password } = data;

      const { UserModel } = DatabaseService;
      const user = await UserModel.findOne({ username });

      if (user === null)
        return res.status(401).json(
          JsonService.createJsonResponse({
            success: false,
            msg: "Aucun utilisateur ne concorde à cet identifiant",
          })
        );

      const { hash, salt } = user;
      const validPassword = await PasswordService.verifyPasswordHash(
        password,
        hash,
        salt
      );

      if (validPassword)
        return res.status(200).json(
          JsonService.createJsonResponse({
            success: true,
            extraParams: [
              {
                name: "user",
                value: user,
              },
            ],
          })
        );

      return res.status(401).json(
        JsonService.createJsonResponse({
          success: false,
          msg: "Le mot de passe est incorrect",
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(200).json(
        JsonService.createJsonResponse({
          success: false,
          error,
        })
      );
    }
  };
}
