import { UserLoginDAO } from "../../STRUDAL/UserLoginDAO";

export class LoginApi {
    getTestResponse() {
        let dao: UserLoginDAO = new UserLoginDAO();
        let entity = dao.getEntity();
        return JSON.stringify(entity)
    }
}