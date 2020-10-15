import { usersPaths } from "./users/users.swagger.js";
import { fixturesPaths } from "./fixtures/fixtures.swagger.js";
import { predictionsPaths } from "./predictions/predictions.swagger.js";

export const iapiPaths = { ...usersPaths, ...fixturesPaths, ...predictionsPaths };
