import { Fixture } from "../../../../STRUDAL/entity/Fixture.js";
import { FixtureDAO } from "../../../../STRUDAL/DAO/FixtureDAO.js";
import { EntityApiResponse } from "../../apiResponse.js";

export class FixturesHandler {
  private fixtureDAO: FixtureDAO;

  constructor() {
    this.fixtureDAO = new FixtureDAO();
  }

  public async getAllFixtures(): Promise<Fixture[]> {
    return await this.fixtureDAO.getAllEntities();
  }

  public async saveFixture(requestBody: unknown): Promise<EntityApiResponse> {
    const apiResponse = new EntityApiResponse();
    console.log("Saving Fixture");
    console.log(requestBody);

    const fixture: Fixture = requestBody as Fixture;
    // TODO: Likely should verify this actually is a Fixture entity
    try {
      apiResponse.entity = await this.fixtureDAO.saveEntity(fixture);
    } catch (error) {
      console.error("Error occurred trying to save Fixture entity");
      console.error(error);
      apiResponse.errorMessage = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }
}
