import { Request, Response } from "express";
import { RouterBase } from "../routerBase.js";
import { IApiPredictionsRouter } from "./predictions/router.js";
import { IApiTeamsRouter } from "./teams/router.js";
import { IApiUsersRouter } from "./users/router.js";
import { LoginApiHandler } from "./handlers/login.js";

/**
 * Base router for all internal API calls (i.e. from the front end)
 */
export class IApiRouter extends RouterBase {
  protected initLocalRoutes(): void {
    this.router.all("/", this.index.bind(this));
    this.router.get("/users", this.login.bind(this));
  }

  protected initChildRoutes(): void {
    this.router.use("/predictions", new IApiPredictionsRouter().router);
    this.router.use("/teams", new IApiTeamsRouter().router);
    this.router.use("/users", new IApiUsersRouter().router);
  }

  private async login(req: Request, res: Response) {
    const entity = await new LoginApiHandler().getTestResponse();

    res.json(entity);
  }

  private index(req: Request, res: Response) {
    res.send("Welcome to the internal API landing page <br/> API listing coming soon!");
  }
}
