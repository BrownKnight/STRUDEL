import { Request, Response } from "express";
import { Fixture } from "../../../../STRUDAL/entity/Fixture.js";
import { RouterBase } from "../../../routerBase.js";
import { EntityApiResponse } from "../../apiResponse.js";
import { FixturesHandler } from "../../fixtures/fixturesHandler.js";
import fetch from "node-fetch";
import moment from "moment";
import { TeamsHandler } from "../../teams/teamsHandler.js";
import { AdminOnly } from "../../../middleware/adminOnlyDecorator.js";
import { FixtureResult } from "../../../../STRUDAL/entity/dataTypes/FixtureResult.js";

/**
 * Router to handle requests to populate STRUDAL with information from third-party API's
 *
 * Routes:
 * POST:/external/fixtures/importbydate    : Load in fixtures for a specified date (params: date)
 */
export class IApiFootballApiRouter extends RouterBase {
  private _fixturesHandler: FixturesHandler;

  constructor() {
    super();
    this._fixturesHandler = new FixturesHandler();
  }

  protected initLocalRoutes(): void {
    this.router.post("/importbydate", this.loadFixturesByDate.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  @AdminOnly()
  private async loadFixturesByDate(req: Request, res: Response) {
    const date = req.query["date"];
    if (!date) {
      res.status(400).json(new EntityApiResponse(false, "No start/end date supplied"));
      return;
    }

    const dateStr = moment(date as string).format("YYYY-MM-DD");

    fetch(`https://v2.api-football.com/fixtures/league/2790/${dateStr}`, {
      headers: { "X-RapidApi-Key": process.env.FOOTBALL_API_KEY ?? "" },
    })
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .then(async (json) => {
        const apiFixtures = json.api.fixtures;
        if (!apiFixtures || apiFixtures.length === 0) {
          res.status(404).send(new EntityApiResponse(false, "No fixtures found for this date"));
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

        // Get all the fixtures for the date in question, so we can update them if they already exist
        const existingFixtures = await this._fixturesHandler.getFixturesForDateRange(dateStr, dateStr);

        const fixtures: Partial<Fixture>[] = apiFixtures.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fixture: any): Partial<Fixture> => {
            const matches = (fixture.round as string).match(/.* - (\d*)/);
            let week = 0;
            if (matches && matches.length > 1) {
              week = parseInt(matches[1]);
            }

            const mappedFixture: Partial<Fixture> = {
              date: moment(fixture.event_date).toDate(),
              time: moment(fixture.event_date).toDate(),
              week: week,
              homeTeam: { id: teamDict[fixture.homeTeam.team_name] },
              awayTeam: { id: teamDict[fixture.awayTeam.team_name] },
              locked: false,
            };

            // Check if the fixture exists, and if so set the id so its updated instead of inserted
            const existingFixture = existingFixtures.find(
              (x) =>
                moment(x.date).isSame(moment(mappedFixture.date), "D") &&
                x.homeTeam.id === mappedFixture.homeTeam?.id &&
                x.awayTeam.id === mappedFixture.awayTeam?.id
            );
            if (existingFixture) {
              mappedFixture.id = existingFixture.id;
              mappedFixture.locked = existingFixture.locked;
            }

            // Check if the incoming fixture is finished and has scores, then determine the result
            if (fixture.statusShort === "FT") {
              if (fixture.goalsHomeTeam > fixture.goalsAwayTeam) {
                mappedFixture.fixtureResult = FixtureResult.HOME;
              } else if (fixture.goalsHomeTeam < fixture.goalsAwayTeam) {
                mappedFixture.fixtureResult = FixtureResult.AWAY;
              } else if (fixture.goalsHomeTeam === fixture.goalsAwayTeam) {
                mappedFixture.fixtureResult = FixtureResult.DRAW;
              }
            }

            return mappedFixture;
          }
        );

        console.log(fixtures);

        // Attempt to save these fixtures
        this.saveFixtures(fixtures).then((apiResponse) => {
          if (apiResponse.success) {
            res.status(200).json(apiResponse);
          } else {
            apiResponse.errorMessage = "Likely some fixtures imported already exist";
            res.status(400).json(apiResponse);
          }
        });
      })
      .catch((error) => res.status(500).send(error));
  }

  private async saveFixtures(fixtures: Partial<Fixture>[]) {
    const apiResponse: EntityApiResponse = await this._fixturesHandler.saveMultipleEntities(fixtures);
    return apiResponse;
  }
}
