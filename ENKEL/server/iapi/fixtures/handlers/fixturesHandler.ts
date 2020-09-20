import { Fixture } from "../../../../STRUDAL/entity/Fixture.js";
import { FixtureDAO } from "../../../../STRUDAL/DAO/FixtureDAO.js";
import { BasicEntityOperationHandler } from "../../handlers/basicEntityOperationHandler.js";

export class FixturesHandler extends BasicEntityOperationHandler<Fixture> {
  constructor() {
    super(new FixtureDAO());
  }
}
