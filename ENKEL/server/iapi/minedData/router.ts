import { AdminOnly } from "../../middleware/adminOnlyDecorator.js";
import { EntityRouter } from "../entityRouter.js";
import { MinedDataHandler } from "./minedDataHandler.js";
import { Request, Response } from "express";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users 
 * through the standard Entity API
 *
 * Routes:

 */
export class IApiMinedDataRouter extends EntityRouter {
  constructor() {
    super(new MinedDataHandler());
  }

  protected initLocalRoutes(): void {
    // No local routes
  }

  protected initChildRoutes(): void {
    // No child routes
  }

  @AdminOnly()
  protected async saveEntity(req: Request, res: Response): Promise<void> {
    return await super.saveEntity(req, res);
  }
}
