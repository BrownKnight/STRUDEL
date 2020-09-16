import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
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
  private predictionsHandler: PredictionsHandler;

  constructor() {
    super();
    this.predictionsHandler = new PredictionsHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllPredictions.bind(this));
    this.router.put("/", this.savePrediction.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private getAllPredictions(req: Request, res: Response) {
    res.json(this.predictionsHandler.getAllPredictions());
  }

  private savePrediction(req: Request, res: Response) {
    const errorMessage: string = this.predictionsHandler.savePrediction(req.body);
    if (errorMessage != "") {
      res.status(200);
    } else {
      res.status(400).json({ error: errorMessage });
    }
  }
}
