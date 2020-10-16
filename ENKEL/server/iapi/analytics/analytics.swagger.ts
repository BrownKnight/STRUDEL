import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const analyticsPaths = {
  ...generateCRUDOperationDocs("AnalyticsItem", "Analytics"),
};
