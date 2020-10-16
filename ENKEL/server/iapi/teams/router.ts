import { EntityRouter } from "../entityRouter.js";
import { TeamsHandler } from "./teamsHandler.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users 
 * through the standard Entity API
 *
 * Routes:

 */
export class IApiTeamsRouter extends EntityRouter {
  constructor() {
    super(new TeamsHandler());
  }

  protected initLocalRoutes(): void {
    // No local routes
  }

  protected initChildRoutes(): void {
    // No child routes
  }
}
