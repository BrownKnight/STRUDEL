import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const schedulePaths = {
  ...generateCRUDOperationDocs("Schedule"),
};
