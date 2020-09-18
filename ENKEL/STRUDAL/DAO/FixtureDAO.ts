import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { Fixture } from "../entity/Fixture.js";

export class FixtureDAO extends BaseDAO<Fixture> {
  constructor() {
    super(Fixture);
  }
}
