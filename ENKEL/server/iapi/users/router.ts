import { Request, Response } from "express";
import moment from "moment";
import { UserLogin } from "../../../STRUDAL/entity/UserLogin.js";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { PredictionsHandler } from "../predictions/predictionsHandler.js";
import { UserLoginsHandler } from "./userLoginsHandler.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/              : Get all userLogins
 * GET:/<team_id>     : Get user for the given UserID
 * PUT:/              : Create or update a user
 * DELETE:/<team_id>  : Delete a given user
 */
export class IApiUserLoginsRouter extends RouterBase {
  private _userLoginsHandler: UserLoginsHandler;
  private _predictionsHandler: PredictionsHandler;

  constructor() {
    super();
    this._userLoginsHandler = new UserLoginsHandler();
    this._predictionsHandler = new PredictionsHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllUserLogins.bind(this));
    this.router.put("/", this.saveUser.bind(this));
    this.router.delete("/:userId", this.deleteUser.bind(this));
    this.router.post("/:userId/generate-predictions", this.generatePredictionsForUserInDateRange.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private async getAllUserLogins(req: Request, res: Response) {
    res.json(await this._userLoginsHandler.getAllEntities());
  }

  private async saveUser(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._userLoginsHandler.saveEntity(req.body);
    (apiResponse.entity as UserLogin).password = "";
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }

  private async deleteUser(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._userLoginsHandler.deleteEntity(req.params["userId"]);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
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
