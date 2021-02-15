import { EntityRouter } from "../entityRouter.js";
import { AnalyticsHandler } from "./analyticsHandler.js";
import { Request, Response } from "express";
import { AdminOnly } from "../../middleware/adminOnlyDecorator.js";
import moment, { Moment } from "moment";
import { EntityApiResponse } from "../apiResponse.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users 
 * through the standard Entity API
 *
 * Routes:

 */
export class IApiAnalyticsRouter extends EntityRouter {
  constructor() {
    super(new AnalyticsHandler());
  }

  protected initLocalRoutes(): void {
    this.router.get("/user/:userId", this.getPredictionsForUser.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes
  }

  @AdminOnly()
  protected async saveEntity(req: Request, res: Response): Promise<void> {
    return await super.saveEntity(req, res);
  }

  private async getPredictionsForUser(req: Request, res: Response): Promise<void> {
    const startDate: Moment = moment(req.query["startDate"] as string) ?? moment().startOf("week");
    const endDate: Moment = moment(req.query["endDate"] as string) ?? moment().endOf("week");
    const userId: number = parseInt(req.params["userId"], 10);

    if (!userId) {
      res.status(400).json(new EntityApiResponse(false, "No userID supplied"));
      return;
    }

    const analytics = await (this._entityHandler as AnalyticsHandler).getPredictionAnalyticsForUserInDateRange(
      startDate,
      endDate,
      userId
    );

    res.status(200).json(new EntityApiResponse(true, "", analytics));
  }
}
