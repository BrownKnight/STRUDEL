import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { Fixture } from "../entity/Fixture.js";
import { Moment } from "moment";

export class FixtureDAO extends BaseDAO<Fixture> {
  constructor() {
    super(Fixture);
  }

  async getAllEntities(): Promise<Fixture[]> {
    return super.getAllEntities({ relations: ["homeTeam", "awayTeam"] });
  }

  async getFixturesForDateRange(startDate: Moment, endDate: Moment): Promise<Fixture[]> {
    return this._repository
      .createQueryBuilder("fixture")
      .where("fixture.date BETWEEN :start AND :end", {
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
      })
      .getMany();
  }
}
