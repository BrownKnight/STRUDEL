import { Team } from "../../../../STRUDAL/entity/Team.js";
import { TeamDAO } from "../../../../STRUDAL/DAO/TeamDAO.js";

export class TeamsHandler {
  private teamDAO: TeamDAO;

  constructor() {
    this.teamDAO = new TeamDAO();
  }

  public async getAllTeams(): Promise<Team[]> {
    return await this.teamDAO.getAllEntities();
  }

  public saveTeam(requestBody: unknown): string {
    console.log("Saving Team");
    console.log(requestBody);

    const team: Team = requestBody as Team;
    // TODO: Likely should verify this actually is a Team entity
    try {
      this.teamDAO.saveEntity(team);
    } catch (error) {
      console.error("Error occurred trying to save Team entity");
      console.error(error);
      return error;
    }
    return "";
  }
}
