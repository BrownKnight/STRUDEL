import { Request, Response } from "express";
import { EntityApiResponse } from "../apiResponse.js";
import { FixturesHandler } from "./fixturesHandler.js";
import { Fixture } from "../../../STRUDAL/entity/Fixture.js";
import { EntityRouter } from "../entityRouter.js";
import { AdminOnly } from "../../middleware/adminOnlyDecorator.js";

/**
 * Router for all internal userLogins-based api calls. Supports the fetching, updating, and deleting of users
 * through the standard Entity API
 *
 * Allows the fetching of fixtures, with all it's predictions, within a given date range.
 * Can also convert the fixture data into a CSV format
 *
 * Routes:
 * GET:/bydate  : Get Fixture for a given date range. Able to convert to CSV format (params: startDate, endDate)
 */
export class IApiFixturesRouter extends EntityRouter {
  private _fixturesHandler: FixturesHandler;

  constructor() {
    const fixturesHandler = new FixturesHandler();
    super(fixturesHandler);
    this._fixturesHandler = fixturesHandler;
  }

  protected initLocalRoutes(): void {
    this.router.get("/bydate", this.getFixturesByDate.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes
  }

  @AdminOnly()
  protected async saveEntity(req: Request, res: Response): Promise<void> {
    return await super.saveEntity(req, res);
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

  private flattenFixtures(fixtures: Fixture[]) {
    const flattenedFixture = fixtures.map((fixture) => {
      return {
        id: fixture.id,
        week: fixture.week,
        date: fixture.date,
        time: fixture.time,
        homeTeamName: fixture.homeTeam.teamName,
        awayTeamName: fixture.awayTeam.teamName,
        FTR: fixture.fixtureResult,
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
    dict["fixtureId"] = {};
    dict["week"] = {};
    dict["date"] = {};
    dict["time"] = {};
    dict["homeTeamName"] = {};
    dict["awayTeamName"] = {};
    dict["FTR"] = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objArray.forEach((fixture: Record<string, any>, index: number) => {
      dict["fixtureId"][index] = fixture.id;
      dict["week"][index] = fixture.week;
      dict["date"][index] = fixture.date;
      dict["time"][index] = fixture.time;
      dict["homeTeamName"][index] = fixture.homeTeamName;
      dict["awayTeamName"][index] = fixture.awayTeamName;
      dict["FTR"][index] = fixture.FTR;
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
