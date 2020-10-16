import { generateCRUDOperationDocs } from "../basicEntityOperation.swagger.js";

export const predictionsPaths = {
  ...generateCRUDOperationDocs("Prediction"),
  "/iapi/predictions/bydate": {
    get: {
      tags: ["Prediction"],
      description:
        "Returns all predictions within the given date range. Data includes fixture information and user information.",
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
      responses: {
        200: {
          description: "Successfully found data",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Prediction" },
              },
            },
          },
        },
        400: {
          description: "Likely invalid request or unknown error occurred",
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
  "iapi/predictions/{userId}/generate": {
    post: {
      tags: ["Prediction"],
      description: "Generates empty predictions for a given user for all fixtures in a given date range",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "User for which to generate predictions for",
          schema: {
            type: "integer",
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
          description:
            "Successfully generated predictions for the user and date range. entity field in response will be a list of all the new predictions generated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EntityApiResponse",
              },
            },
          },
        },
        400: {
          description: "Likely invalid request or unknown error occurred",
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
