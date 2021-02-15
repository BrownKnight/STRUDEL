import { AnalyticsItems } from "../../../STRUDAL/entity/AnalyticsItems.js";
import { AnalyticsItemsDAO } from "../../../STRUDAL/DAO/AnalyticsitemsDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import { PredictionsHandler } from "../predictions/predictionsHandler.js";
import moment from "moment";

export type UserAnalytics = {
  type: "Daterange" | "Matchweek";
  correctPredictions: number;
  incorrectPredictions: number;
  total: number;
  totalWithResults: number;
};

export class AnalyticsHandler extends BasicEntityOperationHandler<AnalyticsItems> {
  constructor() {
    super(new AnalyticsItemsDAO());
  }

  async getPredictionAnalyticsForUserInDateRange(
    startDate: moment.Moment,
    endDate: moment.Moment,
    userId: number
  ): Promise<UserAnalytics> {
    const userAnalytics: UserAnalytics = {
      type: "Daterange",
      correctPredictions: -1,
      incorrectPredictions: -1,
      total: -1,
      totalWithResults: -1,
    };

    const predictionsHandler = new PredictionsHandler();
    const userPredictions = await predictionsHandler.getPredictionsInDateRange(startDate, endDate, userId);

    userAnalytics.correctPredictions = userPredictions.reduce((correct, prediction) => {
      if (prediction.prediction === prediction.fixture.fixtureResult) {
        correct = correct + 1;
      }
      return correct;
    }, 0);

    userAnalytics.incorrectPredictions = userPredictions.reduce((incorrect, prediction) => {
      if (prediction.fixture.fixtureResult && prediction.prediction !== prediction.fixture.fixtureResult) {
        incorrect = incorrect + 1;
      }
      return incorrect;
    }, 0);

    userAnalytics.total = userPredictions.length;
    userAnalytics.totalWithResults = userPredictions.reduce((count, prediction) => {
      if (prediction.fixture.fixtureResult) {
        count = count + 1;
      }
      return count;
    }, 0);

    return userAnalytics;
  }
}
