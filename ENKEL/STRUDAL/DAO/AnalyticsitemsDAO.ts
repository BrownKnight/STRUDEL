import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { AnalyticsItems } from "../entity/AnalyticsItems.js";

export class AnalyticsItemsDAO extends BaseDAO<AnalyticsItems> {
  constructor() {
    super(AnalyticsItems);
  }
}
