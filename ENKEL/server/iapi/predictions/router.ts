import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { PredictionsHandler } from "./handlers/predictionsHandler.js";

/**
 * Router for all internal predictions-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/                    : Get all predictions
 * GET:/<prediction_id>     : Get prediction for the given PredictionID
 * PUT:/                    : Create or update a prediction
 * DELETE:/<prediction_id>  : Delete a given prediciton
 */
export class IApiPredictionsRouter extends RouterBase {
  private _predictionsHandler: PredictionsHandler;

  constructor() {
    super();
    this._predictionsHandler = new PredictionsHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllPredictions.bind(this));
    this.router.put("/", this.savePrediction.bind(this));
    this.router.delete("/:predictionId", this.deletePrediction.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private async getAllPredictions(req: Request, res: Response) {
    res.json(await this._predictionsHandler.getAllEntities());
  }

  private async savePrediction(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._predictionsHandler.saveEntity(req.body);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }

  private async deletePrediction(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._predictionsHandler.deleteEntity(req.params["predictionId"]);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }
}
