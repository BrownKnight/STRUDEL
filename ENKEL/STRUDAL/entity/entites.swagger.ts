const EntityEnums = {
  FixtureResult: {
    type: "string",
    enum: ["H", "A", "D"],
  },
};

export const entitySchemas = {
  ...EntityEnums,
  Team: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      teamName: {
        type: "string",
      },
      teamLogoUrl: {
        type: "string",
      },
    },
  },
  Fixture: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      homeTeam: {
        $ref: "#/components/schemas/Team",
      },
      awayTeam: {
        $ref: "#/components/schemas/Team",
      },
      time: {
        type: "string",
        format: "time",
      },
      date: {
        type: "string",
        format: "date",
      },
      fixtureResult: {
        $ref: "#/components/schemas/FixtureResult",
      },
    },
  },
  Prediction: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      fixture: {
        $ref: "#/components/schemas/Fixture",
      },
      user: {
        $ref: "#/components/schemas/User",
      },
      prediction: {
        type: "string",
      },
    },
  },
  User: {
    type: "object",
    allOf: [
      {
        $ref: "#components/schemas/UserLogin",
      },
      {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          fullName: {
            type: "string",
          },
          userRole: {
            type: "string",
          },
        },
      },
    ],
  },
  UserLogin: {
    type: "object",
    properties: {
      emailAddress: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        format: "password",
      },
    },
  },
};
