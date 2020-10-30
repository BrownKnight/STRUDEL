import { RouterBase } from "../../routerBase.js";
import { IApiAppleRouter } from "./apple/router.js";
import { IApiFootballApiRouter } from "./footballApi/router.js";

/**
 * Router to handle requests for external services used by STRUDAL
 *
 * Routes:
 * ALL:/external/fixtures     : Routes to FootballApiRouter
 * ALL:/external/apple        : Routes to AppleApiRouter
 */
export class IApiExternalRouter extends RouterBase {
  constructor() {
    super();
  }

  protected initLocalRoutes(): void {
    // No local routes
  }

  protected initChildRoutes(): void {
    this.router.use("/fixtures", new IApiFootballApiRouter().router);
    this.router.use("/apple", new IApiAppleRouter().router);
  }
}
