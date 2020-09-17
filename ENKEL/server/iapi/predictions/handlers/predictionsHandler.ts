import { Prediction } from "../../../../STRUDAL/entity/Prediction.js";
import { PredictionDAO } from "../../../../STRUDAL/DAO/PredictionDAO.js";

export class PredictionsHandler {
  private predictionDAO: PredictionDAO;

  constructor() {
    this.predictionDAO = new PredictionDAO();
  }

  public async getAllPredictions(): Promise<Prediction[]> {
    return await this.predictionDAO.getAllEntities();
  }

  public savePrediction(requestBody: string): string {
    const prediction: Prediction = JSON.parse(requestBody);
    this.predictionDAO.saveEntity(prediction);
    return "";
  }
}
