import { UserLogin } from "../../../../STRUDAL/entity/UserLogin.js";
import { UserLoginDAO } from "../../../../STRUDAL/DAO/UserLoginDAO.js";
import { BasicEntityOperationHandler } from "../../handlers/basicEntityOperationHandler.js";
import { LoginResponse } from "../../loginResponse.js";
import bcrypt from "bcrypt";

export class UserLoginsHandler extends BasicEntityOperationHandler<UserLogin> {
  constructor() {
    super(new UserLoginDAO());
  }

  async handleLoginAttempt(requestBody: Record<string, string>): Promise<LoginResponse> {
    // Find the user and check the email & password hash
    if (!requestBody.emailAddress || !requestBody.password) {
      return new LoginResponse(false, "Email or Password not provided");
    }

    const dao = this._DAO as UserLoginDAO;
    const user: UserLogin | undefined = await dao.findEntity({
      where: { emailAddress: requestBody.emailAddress },
    });

    if (!user) {
      return new LoginResponse(false, "Email Address or Password not correct");
    }

    if (!(await bcrypt.compare(requestBody.password, user.password))) {
      return new LoginResponse(false, "Email Address or Password not correct");
    }

    const token = dao.generateAuthToken(user);
    return new LoginResponse(true, "", token);
  }
}
