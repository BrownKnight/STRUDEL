import { UserLogin } from "../../../../STRUDAL/entity/UserLogin.js";
import { UserLoginDAO } from "../../../../STRUDAL/DAO/UserLoginDAO.js";
import { BasicEntityOperationHandler } from "../../handlers/basicEntityOperationHandler.js";

export class UserLoginsHandler extends BasicEntityOperationHandler<UserLogin> {
  constructor() {
    super(new UserLoginDAO());
  }
}
