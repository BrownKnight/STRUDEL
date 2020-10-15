import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const fixturesPaths = {
  ...generateCRUDOperationDocs("Fixture"),
  "/iapi/fixtures/bydate": {
    get: {
      tags: ["Fixture"],
      description: "Returns all fixtures within the given date range",
      parameters: [
        {
          name: "startDate",
          in: "query",
          description: "Beginning date of date range",
          required: true,
          schema: {
            type: "string",
            format: "date",
          },
        },
        {
          name: "endDate",
          in: "query",
          description: "End date of date range",
          required: true,
          schema: {
            type: "string",
            format: "date",
          },
        },
      ],
    },
  },
};
