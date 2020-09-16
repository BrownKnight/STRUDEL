import "reflect-metadata";
import pkg from "typeorm";
const { getRepository } = pkg;

import { Prediction } from "./entity/Prediction.js";

export class PredictionDAO {
  async getAllEntities(): Promise<Prediction[]> {
    return await getRepository(Prediction).find();
  }

  async saveEntity(prediction: Prediction): Promise<void> {
    getRepository(Prediction).save(prediction);
  }
}
