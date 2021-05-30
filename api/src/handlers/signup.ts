import { RequestHandler } from "express";
import { DatabaseService, DatabaseSchemas } from "../services/database-service";

export default class Signup {
  private constructor() { }
  
  public static handlePost: RequestHandler = async (req, res) => {
    try {
      const UserModel = await DatabaseService.getModel<DatabaseSchemas.User>();
    } catch {
      
    }
  }
}
