import { Prediction } from "../../../../STRUDAL/entity/Prediction.js";
import { PredictionDAO } from "../../../../STRUDAL/DAO/PredictionDAO.js";
import { BasicEntityOperationHandler } from "../../handlers/basicEntityOperationHandler.js";

export class PredictionsHandler extends BasicEntityOperationHandler<Prediction> {
  constructor() {
    super(new PredictionDAO());
  }

  async getPredictionsInDateRange(startDate: Date, endDate: Date, user?: number): Promise<Prediction[]> {
    return await (this._DAO as PredictionDAO).getEntitiesInDateRange(startDate, endDate, user);
  }
}
