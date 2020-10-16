import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const teamsPaths = {
  ...generateCRUDOperationDocs("Team"),
};
