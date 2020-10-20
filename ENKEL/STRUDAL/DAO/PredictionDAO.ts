import { BaseDAO } from "./BaseDAO.js";
import { Prediction } from "../entity/Prediction.js";
import { Moment } from "moment";

export class PredictionDAO extends BaseDAO<Prediction> {
  constructor() {
    super(Prediction);
  }

  async getAllEntities(): Promise<Prediction[]> {
    return super
      .getAllEntities({ relations: ["user", "fixture", "fixture.homeTeam", "fixture.awayTeam"] })
      .then((entities) => {
        entities.forEach((entity) => {
          entity.user.password = undefined;
          entity.user.token = undefined;
        });
        return entities;
      });
  }

  async getEntitiesInDateRange(startDate: Moment, endDate: Moment, userId?: number): Promise<Prediction[]> {
    return this._repository
      .createQueryBuilder("prediction")
      .leftJoinAndSelect("prediction.user", "user")
      .leftJoinAndSelect("prediction.fixture", "fixture")
      .leftJoinAndSelect("fixture.homeTeam", "homeTeam")
      .leftJoinAndSelect("fixture.awayTeam", "awayTeam")
      .select(["fixture", "prediction", "user.fullName", "user.id", "homeTeam", "awayTeam"])
      .where("fixture.date BETWEEN :startDate AND :endDate", {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      })
      .andWhere(userId ? "user.id = :userId" : "1=1", { userId })
      .orderBy("fixture.date", "DESC")
      .addOrderBy("fixture.time", "DESC")
      .addOrderBy("user.fullName", "ASC")
      .getMany();
  }
}
