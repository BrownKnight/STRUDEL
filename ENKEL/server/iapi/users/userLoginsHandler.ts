import { UserLogin } from "../../../STRUDAL/entity/UserLogin.js";
import { UserLoginDAO } from "../../../STRUDAL/DAO/UserLoginDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import { LoginResponse } from "../loginResponse.js";
import bcrypt from "bcrypt";
import { EntityApiResponse } from "../apiResponse.js";
import { UserRole } from "../../../STRUDAL/entity/dataTypes/UserRoles.js";

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
      return new LoginResponse(false, "Email Address or Password not correct :(");
    }

    if (user.password == null || user.password === "") {
      return new LoginResponse(false, "No Password, so cannot process");
    }

    if (!(await bcrypt.compare(requestBody.password, user.password))) {
      return new LoginResponse(false, "Email Address or Password not correct");
    }

    const token = dao.generateAuthToken(user);
    return new LoginResponse(true, "", token);
  }

  async handleUserRegister(requestBody: Record<string, string>): Promise<EntityApiResponse> {
    const newUserEntity = {
      fullName: requestBody.fullName,
      emailAddress: requestBody.emailAddress,
      password: requestBody.password,
      userRole: UserRole.STANDARD,
    };
    return this.saveEntity(newUserEntity);
  }
}
