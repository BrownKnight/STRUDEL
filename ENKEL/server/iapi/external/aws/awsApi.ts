export const awsApiPaths = {
  "/iapi/external/fixtures/importbydate": {
    post: {
      tags: ["External Services"],
      description: "Using an external football api, fetch fixtures for a given date and import them into STRUDEL",
      parameters: [
        {
          name: "date",
          in: "query",
          description: "Date to fetch fixtures for",
          required: true,
          schema: {
            type: "string",
            format: "date",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfully found and imported data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EntityApiResponse",
              },
            },
          },
        },
        400: {
          description: "Likely invalid request or unknown error occurred. Imported fixtures may already exist.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EntityApiResponse",
              },
            },
          },
        },
        404: {
          description: "Could not find any fixtures for the given date",
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
