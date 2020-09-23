import { BaseDAO } from "./BaseDAO.js";
import { Prediction } from "../entity/Prediction.js";

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

  async getEntitiesInDateRange(startDate: Date, endDate: Date, user?: number): Promise<Prediction[]> {
    let whereString = `Prediction__fixture.date BETWEEN '${startDate
      .toISOString()
      .slice(0, 10)}' AND '${endDate.toISOString().slice(0, 10)}'`;
    if (user) {
      whereString += ` AND Prediction__user.id = ${user}`;
    }

    return super
      .getAllEntities({
        relations: ["user", "fixture", "fixture.homeTeam", "fixture.awayTeam"],
        where: whereString,
      })
      .then((entities) => {
        entities.forEach((entity) => {
          entity.user.password = undefined;
          entity.user.token = undefined;
        });
        return entities;
      });
  }
}
