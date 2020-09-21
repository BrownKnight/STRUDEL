import { UserLogin } from "../entity/UserLogin.js";
import { BaseDAO } from "./BaseDAO.js";
import { sign as jwtsign } from "jsonwebtoken";
import fs from "fs";

export class UserLoginDAO extends BaseDAO<UserLogin> {
  constructor() {
    super(UserLogin);
  }

  generateAuthToken(userLogin: UserLogin): string {
    const privateKey = fs.readFileSync("../../../auth.private.key");
    const token = jwtsign(
      { id: userLogin.id, emailAddress: userLogin.emailAddress, fullName: userLogin.fullName },
      privateKey,
      { algorithm: "RS512", expiresIn: "1h" }
    );

    return token;
  }
}
