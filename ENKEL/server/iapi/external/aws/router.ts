import { Request, Response } from "express";
import { RouterBase } from "../../../routerBase.js";
import { EntityApiResponse } from "../../apiResponse.js";
import { AdminOnly } from "../../../middleware/adminOnlyDecorator.js";
import { AWSHandler } from "./awsHandler.js";

/**
 * Router to proxy requests to the AWS api
 *
 * Routes:
 * POST:/external/aws/create-template : Create a new email template
 */
export class IApiAWSApiRouter extends RouterBase {
  private _awsHandler: AWSHandler;

  constructor() {
    super();
    this._awsHandler = new AWSHandler();
  }

  protected initLocalRoutes(): void {
    this.router.post("/create-template", this.createTemplate.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  @AdminOnly()
  private async createTemplate(req: Request, res: Response) {
    const body = req.body;
    if (body == null) {
      res.status(400).json(new EntityApiResponse(false, "No Template supplied"));
      return;
    }

    const apiResponse = await this._awsHandler.createTemplate(req.body);
    if (apiResponse) {
      if (apiResponse.success) {
        res.status(200).json(apiResponse);
      } else {
        res.status(500).json(apiResponse);
      }
    } else {
      res.status(500).json(apiResponse);
    }
  }
}
