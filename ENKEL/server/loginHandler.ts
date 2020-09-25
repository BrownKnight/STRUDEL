import { Request, Response } from "express";
import { EntityApiResponse } from "./iapi/apiResponse.js";
import { LoginResponse } from "./iapi/loginResponse.js";
import { UserLoginsHandler } from "./iapi/users/handlers/userLoginsHandler.js";

export class LoginHandler {
  private _userLoginsHandler: UserLoginsHandler;

  constructor() {
    this._userLoginsHandler = new UserLoginsHandler();
  }

  public async login(req: Request, res: Response): Promise<void> {
    const loginResponse: LoginResponse = await this._userLoginsHandler.handleLoginAttempt(req.body);
    if (loginResponse.success) {
      res.status(200).json(loginResponse);
    } else {
      res.status(401).json(loginResponse);
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    const entityApiResponse: EntityApiResponse = await this._userLoginsHandler.handleUserRegister(req.body);
    if (entityApiResponse.success) {
      res.status(200).json(entityApiResponse);
    } else {
      res.status(401).json(entityApiResponse);
    }
  }
}
