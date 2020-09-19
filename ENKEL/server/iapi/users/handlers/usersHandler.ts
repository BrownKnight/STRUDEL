import { UserLogin } from "../../../../STRUDAL/entity/UserLogin.js";
import { UserLoginDAO } from "../../../../STRUDAL/DAO/UserLoginDAO.js";
import { EntityApiResponse } from "../../apiResponse.js";

export class UsersHandler {
  private userDAO: UserLoginDAO;

  constructor() {
    this.userDAO = new UserLoginDAO();
  }

  public async getAllUsers(): Promise<UserLogin[]> {
    return await this.userDAO.getAllEntities();
  }

  public async saveUser(requestBody: unknown): Promise<EntityApiResponse> {
    const apiResponse = new EntityApiResponse();
    console.log("Saving User");
    console.log(requestBody);

    const user: UserLogin = requestBody as UserLogin;
    // TODO: Likely should verify this actually is a User entity
    try {
      apiResponse.entity = await this.userDAO.saveEntity(user);
    } catch (error) {
      console.error("Error occurred trying to save User entity");
      console.error(error);
      apiResponse.errorMessage = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }
}
