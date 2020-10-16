import { Request, Response } from "express";
import { RouterBase } from "../routerBase.js";
import { IApiPredictionsRouter } from "./predictions/router.js";
import { IApiTeamsRouter } from "./teams/router.js";
import { IApiUserLoginsRouter } from "./users/router.js";
import { IApiFixturesRouter } from "./fixtures/router.js";
import { IApiExternalRouter } from "./external/router.js";
import { IApiAnalyticsRouter } from "./analytics/router.js";

/**
 * Base router for all internal API calls (i.e. from the front end)
 */
export class IApiRouter extends RouterBase {
  protected initLocalRoutes(): void {
    this.router.all("/", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    this.router.use("/predictions", new IApiPredictionsRouter().router);
    this.router.use("/teams", new IApiTeamsRouter().router);
    this.router.use("/users", new IApiUserLoginsRouter().router);
    this.router.use("/fixtures", new IApiFixturesRouter().router);
    this.router.use("/external", new IApiExternalRouter().router);
    this.router.use("/analytics", new IApiAnalyticsRouter().router);
  }

  private index(req: Request, res: Response) {
    res.send("Welcome to the internal API landing page <br/> API listing coming soon!");
  }
}
