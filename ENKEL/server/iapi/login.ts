import { UserLoginDAO } from "../../STRUDAL/UserLoginDAO.js";
import { SimpleConsoleLogger } from "typeorm";

export class LoginApi {
    getTestResponse() {
        console.log("test response")
        let dao: UserLoginDAO = new UserLoginDAO();
        return dao.getEntity();
    }
}