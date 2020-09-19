import { basename } from "path";
import { BaseDAO } from "./BaseDAO.js";
import { Prediction } from "../entity/Prediction.js";

export class PredictionDAO extends BaseDAO<Prediction> {
  constructor() {
    super(Prediction);
  }
}
