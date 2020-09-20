import { BaseDAO } from "./BaseDAO.js";
import { Prediction } from "../entity/Prediction.js";

export class PredictionDAO extends BaseDAO<Prediction> {
  constructor() {
    super(Prediction);
  }

  async getAllEntities(): Promise<Prediction[]> {
    return super.getAllEntities({ relations: ["user", "fixture", "fixture.homeTeam", "fixture.awayTeam"] });
  }
}
