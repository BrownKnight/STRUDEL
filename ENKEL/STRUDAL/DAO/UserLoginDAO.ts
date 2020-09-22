import { UserLogin } from "../entity/UserLogin.js";
import { BaseDAO } from "./BaseDAO.js";
import pkg from "typeorm";
import jwt from "jsonwebtoken";
import fs from "fs";

export class UserLoginDAO extends BaseDAO<UserLogin> {
  constructor() {
    super(UserLogin);
  }

  // Overrise getAllEntities here to remove the password field
  async getAllEntities(findOptions: pkg.FindManyOptions<UserLogin> = {}): Promise<UserLogin[]> {
    const entities = await super.getAllEntities(findOptions);
    entities.forEach((entity) => {
      entity.password = undefined;
    });
    return entities;
  }

  generateAuthToken(userLogin: UserLogin): string {
    console.log("Generating token");
    const privateKey = fs.readFileSync("auth.private.pem", "utf-8");
    const token = jwt.sign(
      { id: userLogin.id, emailAddress: userLogin.emailAddress, fullName: userLogin.fullName },
      privateKey,
      { algorithm: "RS512", expiresIn: "1h" }
    );

    // Now that we've generated the token, save it against the user
    userLogin.token = token;
    // Create a new object for the save so we don't save the password
    this.saveEntity({ id: userLogin.id, token: userLogin.token });

    return token;
  }
}
