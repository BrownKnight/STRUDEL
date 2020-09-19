import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { Team } from "../entity/Team.js";

export class TeamDAO extends BaseDAO<Team> {
  constructor() {
    super(Team);
  }
}
