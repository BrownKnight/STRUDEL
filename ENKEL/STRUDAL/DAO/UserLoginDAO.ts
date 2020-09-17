import { UserLogin } from "../entity/UserLogin.js";
import { BaseDAO } from "./BaseDAO.js";

export class UserLoginDAO extends BaseDAO<UserLogin> {
  constructor() {
    super(UserLogin);
  }
}
