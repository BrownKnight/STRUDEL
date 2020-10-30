import { applePaths } from "./apple/apple.swagger.js";
import { footballApiPaths } from "./footballApi/footballApi.swagger.js";

export const externalPaths = { ...applePaths, ...footballApiPaths };
