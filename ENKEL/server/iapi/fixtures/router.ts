import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { FixturesHandler } from "./handlers/fixturesHandler.js";

/**
 * Router for all internal fixtures-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/              : Get all Fixtures
 * GET:/<team_id>     : Get Fixture for the given FixtureID
 * PUT:/              : Create or update a team
 * DELETE:/<team_id>  : Delete a given prediciton
 */
export class IApiFixturesRouter extends RouterBase {
  private _fixturesHandler: FixturesHandler;

  constructor() {
    super();
    this._fixturesHandler = new FixturesHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllFixtures.bind(this));
    this.router.put("/", this.saveFixture.bind(this));
    this.router.delete("/:fixtureId", this.deleteFixture.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private async getAllFixtures(req: Request, res: Response) {
    res.json(await this._fixturesHandler.getAllEntities());
  }

  private async saveFixture(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._fixturesHandler.saveEntity(req.body);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }

  private async deleteFixture(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._fixturesHandler.deleteEntity(req.params["fixtureId"]);
    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }
}
