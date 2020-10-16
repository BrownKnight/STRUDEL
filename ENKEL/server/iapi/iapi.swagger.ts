import { usersPaths } from "./users/users.swagger.js";
import { fixturesPaths } from "./fixtures/fixtures.swagger.js";
import { predictionsPaths } from "./predictions/predictions.swagger.js";
import { externalPaths } from "./external/external.swagger.js";
import { analyticsPaths } from "./analytics/analytics.swagger.js";
import { teamsPaths } from "./teams/teams.swagger.js";

export const iapiPaths = {
  ...usersPaths,
  ...fixturesPaths,
  ...predictionsPaths,
  ...teamsPaths,
  ...analyticsPaths,
  ...externalPaths,
};
