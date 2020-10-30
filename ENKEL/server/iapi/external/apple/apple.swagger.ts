export const applePaths = {
  "/iapi/external/apple/tasks": {
    post: {
      tags: ["External Services"],
      description: "Trigger an APPLE task",
      responses: {
        200: {
          description: "Successfully triggered task",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AppleTaskResponse",
              },
            },
          },
        },
      },
    },
    "iapi/external/apple/tasks/{taskId}": {
      get: {
        tags: ["External Services"],
        description: "Get status of the given APPLE task",
        responses: {
          200: {
            description: "Status of given task number",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AppleTaskResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};
