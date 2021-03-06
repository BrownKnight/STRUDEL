import { Request, Response } from "express";
import moment from "moment";
import { UserRole } from "../../../STRUDAL/entity/dataTypes/UserRoles.js";
import { UserLogin } from "../../../STRUDAL/entity/UserLogin.js";
import { EntityApiResponse } from "../apiResponse.js";
import { EntityRouter } from "../entityRouter.js";
import { PredictionsHandler } from "../predictions/predictionsHandler.js";
import { UserLoginsHandler } from "./userLoginsHandler.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users
 * through the standard Entity API
 *
 * Routes:
 * POST:/<userId>/generate-predictions  : Generates empty predictions for the specified user for
 *                                        the given date range. (params: startDate, endDate)
 */
export class IApiUserLoginsRouter extends EntityRouter {
  private _predictionsHandler: PredictionsHandler;

  constructor() {
    super(new UserLoginsHandler());
    this._predictionsHandler = new PredictionsHandler();
  }

  protected initLocalRoutes(): void {
    this.router.post("/:userId/generate-predictions", this.generatePredictionsForUserInDateRange.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes
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

  protected async saveEntity(req: Request, res: Response): Promise<void> {
    const apiResponse: EntityApiResponse = new EntityApiResponse(true);
    const userToEdit: Partial<UserLogin> = req.body;
    const requestUser: UserLogin | undefined = req.user;

    if (!requestUser) {
      apiResponse.success = false;
      apiResponse.errorMessage = "No user found in the request";
      res.status(400).json(apiResponse);
      return;
    }

    // Admin can do whatever they please
    if (requestUser.userRole === UserRole.ADMIN) {
      super.saveEntity(req, res);
      return;
    }

    // Any user can update their own details - to an extent (no token, id, role, name update)
    if (requestUser.id === userToEdit.id) {
      userToEdit.token = undefined;
      userToEdit.userRole = undefined;
      userToEdit.fullName = undefined;
      req.body = userToEdit;

      super.saveEntity(req, res);
      return;
    }

    apiResponse.success = false;
    apiResponse.errorMessage = "Cannot update somebody elses user accounts";
    res.status(400).json(apiResponse);
  }
}
