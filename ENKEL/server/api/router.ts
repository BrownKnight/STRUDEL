import { Request, Response } from "express";
import { RouterBase } from "../routerBase.js";

/**
 * Base router for all internal API calls (i.e. from the front end)
 */
export class ApiRouter extends RouterBase {
  protected initLocalRoutes() {
    this.router.all("/", this.index.bind(this));
  }

  protected initChildRoutes() {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.send("Welcome to the external facing API landing page <br/> API listing coming soon!");
  }
}
