import { Prediction } from "../../../STRUDAL/entity/Prediction.js";
import { PredictionDAO } from "../../../STRUDAL/DAO/PredictionDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import { EntityApiResponse } from "../apiResponse.js";
import { FixtureDAO } from "../../../STRUDAL/DAO/FixtureDAO.js";
import { Moment } from "moment";
import { Fixture } from "../../../STRUDAL/entity/Fixture.js";

export class PredictionsHandler extends BasicEntityOperationHandler<Prediction> {
  private _fixtureDAO: FixtureDAO;

  constructor() {
    super(new PredictionDAO());
    this._fixtureDAO = new FixtureDAO();
  }

  async getPredictionsInDateRange(startDate: Moment, endDate: Moment, userId?: number): Promise<Prediction[]> {
    return await (this._DAO as PredictionDAO).getEntitiesInDateRange(startDate, endDate, userId);
  }

  /**
   * Generate predictions for a given user for all fixtures within a date range
   * @param startDate Start date of the range for fixtures
   * @param endDate End date of the range of fixtures to generate predictions for
   * @param userId User to generate predictions for
   */
  async generatePredictionsForUser(startDate: Moment, endDate: Moment, userId: number): Promise<EntityApiResponse> {
    const fixtures = await this._fixtureDAO.getFixturesForDateRange(startDate, endDate);

    if (!fixtures || fixtures.length === 0) {
      return new EntityApiResponse(false, "No fixtures found");
    }

    const predictions: Prediction[] = [];
    fixtures.forEach((fixture: Fixture) => {
      const prediction = new Prediction();
      prediction.fixture = { id: fixture.id };
      prediction.user = { id: userId };
      predictions.push(prediction);
    });

    const response = await super.saveMultipleEntities(predictions);
    return response;
  }
}
