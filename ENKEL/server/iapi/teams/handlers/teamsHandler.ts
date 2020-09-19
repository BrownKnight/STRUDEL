import { Team } from "../../../../STRUDAL/entity/Team.js";
import { TeamDAO } from "../../../../STRUDAL/DAO/TeamDAO.js";
import { EntityApiResponse } from "../../apiResponse.js";

export class TeamsHandler {
  private teamDAO: TeamDAO;

  constructor() {
    this.teamDAO = new TeamDAO();
  }

  public async getAllTeams(): Promise<Team[]> {
    return await this.teamDAO.getAllEntities();
  }

  public async saveTeam(requestBody: unknown): Promise<EntityApiResponse> {
    const apiResponse = new EntityApiResponse();
    console.log("Saving Team");
    console.log(requestBody);

    const team: Team = requestBody as Team;
    // TODO: Likely should verify this actually is a Team entity
    try {
      apiResponse.entity = await this.teamDAO.saveEntity(team);
    } catch (error) {
      console.error("Error occurred trying to save Team entity");
      console.error(error);
      apiResponse.errorMessage = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }
}
