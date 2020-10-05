import { Request, Response } from "express";
import { Fixture } from "../../../STRUDAL/entity/Fixture.js";
import { RouterBase } from "../../routerBase.js";
import { EntityApiResponse } from "../apiResponse.js";
import { FixturesHandler } from "../fixtures/fixturesHandler.js";
import fetch from "node-fetch";
import moment from "moment";
import { TeamsHandler } from "../teams/teamsHandler.js";

/**
 * Router to handle requests to populate STRUDAL with information from third-party API's
 *
 * Routes:
 * POST:/fixtures/bydate    : Load in fixtures for a specified date (params: date)
 */
export class IApiExternalRouter extends RouterBase {
  private _fixturesHandler: FixturesHandler;

  constructor() {
    super();
    this._fixturesHandler = new FixturesHandler();
  }

  protected initLocalRoutes(): void {
    this.router.post("/fixtures/bydate", this.loadFixturesByDate.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private async loadFixturesByDate(req: Request, res: Response) {
    const date = req.query["date"];
    if (!date) {
      res.status(400).json(new EntityApiResponse(false, "No start/end date supplied"));
      return;
    }

    fetch(`https://v2.api-football.com/fixtures/league/2790/${moment(date as string).format("YYYY-MM-DD")}`, {
      headers: { "X-RapidApi-Key": process.env.FOOTBALL_API_KEY ?? "" },
    })
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .then(async (json) => {
        const apiFixtures = json.api.fixtures;
        if (apiFixtures && apiFixtures.length === 0) {
          res.status(400).send(new EntityApiResponse(false, "No fixtures found for this date"));
          return;
        }

        // Get teams so we can index in to map their names to their id's
        const teamsHandler = new TeamsHandler();
        const teamDict: Record<string, number> = {};
        await teamsHandler.getAllEntities().then((teams) => {
          teams.forEach((team) => {
            teamDict[team.teamName as string] = team.id as number;
          });
        });

        const fixtures: Partial<Fixture>[] = apiFixtures.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fixture: any): Partial<Fixture> => {
            return {
              date: moment(fixture.event_date).toDate(),
              homeTeam: { id: teamDict[fixture.homeTeam.team_name] },
              awayTeam: { id: teamDict[fixture.awayTeam.team_name] },
            };
          }
        );

        console.log(fixtures);

        // Attempt to save these fixtures
        this.saveFixtures(fixtures).then((apiResponse) => {
          if (apiResponse.success) {
            res.status(200).json(apiResponse);
          } else {
            res.status(400).json(apiResponse);
          }
        });
      });
  }

  private async saveFixtures(fixtures: Partial<Fixture>[]) {
    const apiResponse: EntityApiResponse = await this._fixturesHandler.saveMultipleEntities(fixtures);
    return apiResponse;
  }
}
