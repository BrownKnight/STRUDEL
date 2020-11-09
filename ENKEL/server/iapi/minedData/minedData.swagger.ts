import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const minedDataPaths = {
  ...generateCRUDOperationDocs("MinedData"),
};
