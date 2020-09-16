import "reflect-metadata";
import pkg from "typeorm";
const { getRepository } = pkg;

import { Team } from "./entity/Team.js";

export class TeamDAO {
  async getAllEntities(): Promise<Team[]> {
    console.log("Getting all teams");
    return await getRepository(Team).find();
  }

  async saveEntity(team: Team): Promise<void> {
    getRepository(Team).save(team);
  }
}
