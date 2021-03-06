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
      teamCode: {
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
      predictions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Prediction",
        },
        nullable: true,
      },
      locked: {
        type: "boolean",
      },
      week: {
        type: "integer",
      },
    },
  },
  Prediction: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      prediction: {
        type: "string",
      },
      homeWinProbability: {
        type: "number",
      },
      drawProbability: {
        type: "number",
      },
      awayWinProbability: {
        type: "number",
      },
      fixture: {
        $ref: "#/components/schemas/Fixture",
      },
      user: {
        $ref: "#/components/schemas/User",
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
  AnalyticsItem: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Named used to reference the item",
      },
      heading: {
        type: "string",
        description: "Heading to display on top of the item",
      },
      html: {
        type: "string",
        description: "HTML representation of item to display",
      },
      tagLineList: {
        type: "string",
        description: "Comma seperated list of tag lines",
      },
    },
  },
  MinedData: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name used to reference the data item",
      },
      json: {
        type: "object",
        description: "JSON object",
      },
    },
  },
  Schedule: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name used to reference the schedule",
      },
      cron: {
        type: "string",
        description: "CRON string used for the schedule",
      },
      jobName: {
        type: "string",
        description: "Name of the job that is run",
      },
    },
  },
};
