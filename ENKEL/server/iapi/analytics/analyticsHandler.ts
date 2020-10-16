import { AnalyticsItems } from "../../../STRUDAL/entity/AnalyticsItems.js";
import { AnalyticsItemsDAO } from "../../../STRUDAL/DAO/AnalyticsitemsDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";

export class AnalyticsHandler extends BasicEntityOperationHandler<AnalyticsItems> {
  constructor() {
    super(new AnalyticsItemsDAO());
  }
}
