import { Fixture } from "../../../../STRUDAL/entity/Fixture.js";
import { FixtureDAO } from "../../../../STRUDAL/DAO/FixtureDAO.js";
import { BasicEntityOperationHandler } from "../../handlers/basicEntityOperationHandler.js";
import moment from "moment";

export class FixturesHandler extends BasicEntityOperationHandler<Fixture> {
  constructor() {
    super(new FixtureDAO());
  }

  getFixturesForDateRange(startDate: string, endDate: string): Promise<Fixture[]> {
    return (this._DAO as FixtureDAO).getFixturesForDateRange(moment(startDate), moment(endDate));
  }
}
