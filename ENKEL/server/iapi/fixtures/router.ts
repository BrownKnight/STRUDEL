import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { FixturesHandler } from "./fixturesHandler.js";
import { Fixture } from "../../../STRUDAL/entity/Fixture.js";

/**
 * Router for all internal fixtures-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/                  : Get all Fixtures
 * GET:/bydate            : Get Fixture for a given date range (params: startDate, endDate)
 * PUT:/                  : Create or update a team
 * DELETE:/<fixture_id>   : Delete a given fixture
 */
export class IApiFixturesRouter extends RouterBase {
  private _fixturesHandler: FixturesHandler;

  constructor() {
    super();
    this._fixturesHandler = new FixturesHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllFixtures.bind(this));
    this.router.get("/bydate", this.getFixturesByDate.bind(this));
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

  private async getFixturesByDate(req: Request, res: Response) {
    const startDate = req.query["startDate"];
    const endDate = req.query["endDate"];
    if (!startDate || !endDate) {
      res.status(400).json(new EntityApiResponse(false, "No start/end date supplied"));
      return;
    }

    const format = req.query["format"];
    const fixtures = await this._fixturesHandler.getFixturesForDateRange(startDate as string, endDate as string);

    if (format && format === "csv") {
      const flattenedFixtures = this.flattenFixtures(fixtures);
      res.send(this.convertToCSV(flattenedFixtures));
    } else {
      res.json(fixtures);
    }
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

  private flattenFixtures(fixtures: Fixture[]) {
    const flattenedFixture = fixtures.map((fixture) => {
      return {
        date: fixture.date,
        homeTeamName: fixture.homeTeam.teamName,
        awayTeamName: fixture.awayTeam.teamName,
        predictions: fixture.predictions.map((prediction) => {
          return {
            userFullName: prediction.user.fullName,
            prediction: prediction.prediction,
          };
        }),
      };
    });
    return flattenedFixture;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private convertToCSV(objArray: any) {
    const dict: Record<string, Record<number, string>> = {};
    // headerRow, with basics
    dict["date"] = {};
    dict["homeTeamName"] = {};
    dict["awayTeamName"] = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objArray.forEach((fixture: Record<string, any>, index: number) => {
      dict["date"][index] = fixture.date;
      dict["homeTeamName"][index] = fixture.homeTeamName;
      dict["awayTeamName"][index] = fixture.awayTeamName;
      fixture.predictions.forEach((prediction: Record<string, string>) => {
        if (!dict[prediction.userFullName]) {
          dict[prediction.userFullName] = {};
        }
        dict[prediction.userFullName][index] = prediction.prediction;
      });
    });

    let csvString = Object.keys(dict).join(",") + "\n";

    for (let i = 0; i < objArray.length; i++) {
      let line = "";
      Object.keys(dict).forEach((key) => {
        if (line !== "") line += ",";
        line += dict[key][i] ?? "";
      });
      csvString += line + "\n";
    }

    return csvString;
  }
}
