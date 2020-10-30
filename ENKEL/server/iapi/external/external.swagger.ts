import { applePaths } from "./apple/apple.swagger.js";
import { footballApiPaths } from "./footballApi/external.swagger.js";

export const externalPaths = { ...applePaths, ...footballApiPaths };
