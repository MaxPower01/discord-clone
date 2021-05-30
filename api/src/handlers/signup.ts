import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { schema } from "../common/schemas/api/Signup/jsonSchema";
import { Schema } from "../common/schemas/api/Signup/schema";
import ValidationService from "../common/services/validation-service";
import { DatabaseService } from "../services/database-service";
import JsonService from "../services/json-service";
import PasswordService from "../services/password-service";

export default class Signup {
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

      const { username } = data;
      const { UserModel } = DatabaseService;

      // const UserModel = await DatabaseService.getModel<DatabaseSchema.User>();
      if ((await UserModel.findOne({ username })) !== null)
        return res.status(409).json(
          JsonService.createJsonResponse({
            success: false,
            msg: "Ce nom d'utilisateur n'est pas disponible",
          })
        );

      console.log(`Creating user document for "${username}"...`);

      const { hash, salt } = await PasswordService.hashPassword(data.password);

      const user = await new UserModel({
        id: uuid(),
        username: "",
        hash,
        salt,
      }).save();

      console.log(`Succesfully created document "${user.id}"`);

      return res.status(200).json(
        JsonService.createJsonResponse({
          success: true,
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
