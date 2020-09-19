import { UserLoginDAO } from "../../../STRUDAL/DAO/UserLoginDAO.js";

export class LoginApiHandler {
  getTestResponse() {
    console.log("test response");
    const dao: UserLoginDAO = new UserLoginDAO();
    return dao.getAllEntities();
  }
}
