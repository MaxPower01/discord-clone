import crypto from "crypto";

export default class PasswordService {
  // private static _instance: PasswordService;
  // private static get instance(): PasswordService {
  //   if (!PasswordService._instance)
  //     PasswordService._instance = new PasswordService();
  //   return PasswordService._instance;
  // }

  private constructor() {}

  public static hashPassword(
    password: string
  ): Promise<{ salt: string; hash: string }> {
    return new Promise((resolve, reject) => {
      try {
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(password, salt, 10000, 64, "sha512")
          .toString("hex");

        return resolve({ salt, hash });
      } catch (error) {
        return reject(error);
      }
    });
  }

  public static verifyPasswordHash(
    password: string,
    hash: string,
    salt: string
  ): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      if (password.trim() === "") return reject("Password is empty");
      if (salt.trim() === "") return reject("Salt is empty");
      if (hash.trim() === "") return reject("Hash is empty");

      try {
        const verifiedHash = crypto
          .pbkdf2Sync(password, salt, 10000, 64, "sha512")
          .toString("hex");
        return resolve(verifiedHash === hash);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
