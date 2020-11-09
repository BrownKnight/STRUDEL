import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { MinedData } from "../entity/MinedData.js";

export class MinedDataDAO extends BaseDAO<MinedData> {
  constructor() {
    super(MinedData);
  }
}
