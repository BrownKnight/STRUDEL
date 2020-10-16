import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const fixturesPaths = {
  ...generateCRUDOperationDocs("Fixture"),
  "/iapi/fixtures/bydate": {
    get: {
      tags: ["Fixture"],
      description:
        "Returns all fixtures within the given date range. Includes prediction information, and can be provided in csv format instead of json.",
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
        {
          name: "format",
          in: "query",
          description: "Format of the returned data",
          required: false,
          schema: {
            type: "string",
            enum: ["json", "csv"],
            default: "json",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfully found data",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Fixture" },
              },
            },
            "plain/text": {
              schema: {
                type: "string",
              },
            },
          },
        },
        "400": {
          description: "Error description, likely invalid parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EntityApiResponse",
              },
            },
          },
        },
      },
    },
  },
};
