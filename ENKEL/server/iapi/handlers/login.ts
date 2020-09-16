import { UserLoginDAO } from "../../../STRUDAL/UserLoginDAO.js";

export class LoginApiHandler {
    getTestResponse() {
        console.log("test response")
        let dao: UserLoginDAO = new UserLoginDAO();
        return dao.getEntity();
    }
}