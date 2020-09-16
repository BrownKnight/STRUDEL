import { Request, Response } from "express";
import { RouterBase } from "../routerBase.js";
import { LoginApi } from "./handlers/login.js";

/**
 * Base router for all internal API calls (i.e. from the front end)
 */
export class IApiRouter extends RouterBase {
  protected initLocalRoutes() {
    this.router.all("/", this.index.bind(this));
    this.router.get("/login", this.login.bind(this))
  }

  protected initChildRoutes() {
    // No child routes implemented yet
  }

  private async login(req: Request, res: Response) {
    const entity = await new LoginApi().getTestResponse();

    res.json(entity);
  }

  private index(req: Request, res: Response) {
    res.send("Welcome to the internal API landing page <br/> API listing coming soon!");
  }
}
