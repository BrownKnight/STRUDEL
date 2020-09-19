import { Prediction } from "../../../../STRUDAL/entity/Prediction.js";
import { PredictionDAO } from "../../../../STRUDAL/DAO/PredictionDAO.js";

export class PredictionsHandler {
  private _predictionDAO: PredictionDAO;

  constructor() {
    this._predictionDAO = new PredictionDAO();
  }

  public async getAllPredictions(): Promise<Prediction[]> {
    return await this._predictionDAO.getAllEntities();
  }

  public savePrediction(requestBody: string): string {
    const prediction: Prediction = JSON.parse(requestBody);
    this._predictionDAO.saveEntity(prediction);
    return "";
  }
}
