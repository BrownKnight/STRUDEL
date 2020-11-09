import { MinedData } from "../../../STRUDAL/entity/MinedData.js";
import { MinedDataDAO } from "../../../STRUDAL/DAO/MinedDataDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";

export class MinedDataHandler extends BasicEntityOperationHandler<MinedData> {
  constructor() {
    super(new MinedDataDAO());
  }
}
