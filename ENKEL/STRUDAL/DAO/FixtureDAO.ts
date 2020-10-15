import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { Fixture } from "../entity/Fixture.js";
import { Moment } from "moment";
import pkg from "typeorm";

export class FixtureDAO extends BaseDAO<Fixture> {
  constructor() {
    super(Fixture);
  }

  async getAllEntities(): Promise<Fixture[]> {
    return this._repository
      .createQueryBuilder("fixture")
      .leftJoinAndSelect("fixture.homeTeam", "homeTeam")
      .leftJoinAndSelect("fixture.awayTeam", "awayTeam")
      .leftJoinAndSelect("fixture.predictions", "predictions")
      .leftJoinAndSelect("predictions.user", "user")
      .select(["fixture", "homeTeam", "awayTeam", "predictions.prediction", "user.fullName"])
      .orderBy("fixture.date", "DESC")
      .addOrderBy("fixture.time", "DESC")
      .getMany();
  }

  async getFixturesForDateRange(startDate: Moment, endDate: Moment): Promise<Fixture[]> {
    return this._repository
      .createQueryBuilder("fixture")
      .leftJoinAndSelect("fixture.homeTeam", "homeTeam")
      .leftJoinAndSelect("fixture.awayTeam", "awayTeam")
      .leftJoinAndSelect("fixture.predictions", "predictions")
      .leftJoinAndSelect("predictions.user", "user")
      .select(["fixture", "homeTeam.teamName", "awayTeam.teamName", "predictions.prediction", "user.fullName"])
      .where({
        date: pkg.Between(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")),
      })
      .orderBy("fixture.date", "DESC")
      .addOrderBy("fixture.time", "DESC")
      .getMany();
  }
}
