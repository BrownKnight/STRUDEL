import "reflect-metadata";
import pkg from "typeorm";
const { getRepository } = pkg;

import { UserLogin } from "./entity/UserLogin.js";

export class UserLoginDAO {
  async getEntity(): Promise<UserLogin[]> {
    return await getRepository(UserLogin).find();
  }
}
