import { Team } from "../../../STRUDAL/entity/Team.js";
import { TeamDAO } from "../../../STRUDAL/DAO/TeamDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";

export class TeamsHandler extends BasicEntityOperationHandler<Team> {
  constructor() {
    super(new TeamDAO());
  }
}
