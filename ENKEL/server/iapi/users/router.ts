import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { UsersHandler } from "./handlers/usersHandler.js";

/**
 * Router for all internal users-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/              : Get all users
 * GET:/<team_id>     : Get user for the given UserID
 * PUT:/              : Create or update a user
 * DELETE:/<team_id>  : Delete a given user
 */
export class IApiUsersRouter extends RouterBase {
  private _usersHandler: UsersHandler;

  constructor() {
    super();
    this._usersHandler = new UsersHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllUsers.bind(this));
    this.router.put("/", this.saveUser.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private async getAllUsers(req: Request, res: Response) {
    res.json(await this._usersHandler.getAllUsers());
  }

  private async saveUser(req: Request, res: Response) {
    console.log(req.headers)
    const apiResponse: EntityApiResponse = await this._usersHandler.saveUser(req.body);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }
}
