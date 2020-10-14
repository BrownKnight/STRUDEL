import { usersPaths } from "./users/users.swagger.js";
import { fixturesPaths } from "./fixtures/fixtures.swagger.js";

export const iapiPaths = { ...usersPaths, ...fixturesPaths };
