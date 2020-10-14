export const fixturesPaths = {
  "/fixtures": {
    get: {
      tags: ["Fixtures"],
      description: "Returns all fixtures",
      responses: {
        "200": {
          description: "A list of all Fixtures",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Fixture",
                },
              },
            },
          },
        },
      },
    },
  },
};
