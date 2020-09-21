import { UserLogin } from "../entity/UserLogin.js";
import { BaseDAO } from "./BaseDAO.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export class UserLoginDAO extends BaseDAO<UserLogin> {
  constructor() {
    super(UserLogin);
  }

  generateAuthToken(userLogin: UserLogin): string {
    const privateKey = fs.readFileSync("auth.private.pem", "utf-8");
    const token = jwt.sign(
      { id: userLogin.id, emailAddress: userLogin.emailAddress, fullName: userLogin.fullName },
      privateKey,
      { algorithm: "RS512", expiresIn: "1h" }
    );

    // Now that we've generated the token, save it against the user
    userLogin.token = token;
    this.saveEntity(userLogin);

    return token;
  }
}
