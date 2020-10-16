import { Request, Response } from "express";
import { EntityApiResponse } from "../apiResponse.js";
import { PredictionsHandler } from "./predictionsHandler.js";
import moment from "moment";
import { EntityRouter } from "../entityRouter.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users
 * through the standard Entity API.
 *
 * Also supports the generation of empty predictions, and the fetching of predictions within a given date range
 *
 * Routes:
 * GET:/bydate              : Retrieves predictions for the given date range (params: startDate, endDate)
 * POST:/<userId>/generate  : Generates empty predictions for the given user for the given date
 *                            range (params: startDate, endDate)
 */
export class IApiPredictionsRouter extends EntityRouter {
  private _predictionsHandler: PredictionsHandler;
  constructor() {
    const predictionsHandler = new PredictionsHandler();
    super(predictionsHandler);

    this._predictionsHandler = predictionsHandler;
  }

  protected initLocalRoutes(): void {
    this.router.get("/bydate", this.getPredictionsInDateRange.bind(this));
    this.router.post("/:userId/generate", this.generatePredictionsForUserInDateRange.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes
  }

  private async getPredictionsInDateRange(req: Request, res: Response) {
    const startDate = req.query["startDate"]?.toString();
    const endDate = req.query["endDate"]?.toString();
    const user = req.query["user"]?.toString();
    let userId: number | undefined;
    if (user) {
      userId = parseInt(user);
    }

    if (!startDate && !endDate) {
      res.status(400).json(new EntityApiResponse(false, "Start and End date not provided"));
      return;
    }

    const predictions = await this._predictionsHandler
      .getPredictionsInDateRange(new Date(startDate as string), new Date(endDate as string), userId)
      .catch((err) => {
        res.status(400).json(new EntityApiResponse(false, "error fetching predictions", {}, err));
      });

    res.status(200).json(predictions);
  }

  private async generatePredictionsForUserInDateRange(req: Request, res: Response) {
    const startDate = req.query["startDate"]?.toString();
    const endDate = req.query["endDate"]?.toString();
    const userId = parseInt(req.params["userId"]);

    if (!startDate && !endDate) {
      res.status(400).json(new EntityApiResponse(false, "Start and End date not provided"));
      return;
    }

    this._predictionsHandler
      .generatePredictionsForUser(moment(startDate), moment(endDate), userId)
      .then((result) => {
        if (result.success) {
          res.status(200).json(result);
        } else {
          res.status(400).json(result);
        }
      })
      .catch((err) => {
        res.status(400).json(new EntityApiResponse(false, "error generating predictions", {}, err));
      });
  }
}
