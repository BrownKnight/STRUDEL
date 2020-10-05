import { Fixture } from "../../../STRUDAL/entity/Fixture.js";
import { FixtureDAO } from "../../../STRUDAL/DAO/FixtureDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import moment from "moment";
import { EntityApiResponse } from "../apiResponse.js";

export class FixturesHandler extends BasicEntityOperationHandler<Fixture> {
  constructor() {
    super(new FixtureDAO());
  }

  /**
   * When saving a fixture that has previously been fetched with relations, we want to make sure we don't cascade
   * save/update those relational entities
   * @param entity Fixture to save
   */
  public async saveEntity(entity: Partial<Fixture>): Promise<EntityApiResponse> {
    const parsedEntity: Partial<Fixture> = {
      id: entity.id,
      homeTeam: {
        id: entity.homeTeam?.id,
      },
      awayTeam: {
        id: entity.awayTeam?.id,
      },
      date: entity.date,
      fixtureResult: entity.fixtureResult,
    };
    return super.saveEntity(parsedEntity);
  }

  getFixturesForDateRange(startDate: string, endDate: string): Promise<Fixture[]> {
    return (this._DAO as FixtureDAO).getFixturesForDateRange(moment(startDate), moment(endDate));
  }
}
