export function generateCRUDOperationDocs(entityName: string): Record<string, unknown> {
  const CRUDOperations: Record<string, unknown> = {};
  CRUDOperations[`/iapi/${entityName.toLowerCase()}s`] = {
    get: {
      tags: [entityName],
      description: "Get all entites",
      responses: {
        "200": {
          description: "A list of all entites",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: `#/components/schemas/${entityName}`,
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: [entityName],
      description: "Update/Create given entity",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: `#/components/schemas/EntityApiResponse`,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Returns the entity you've just updated/created",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/EntityApiResponse`,
              },
            },
          },
        },
      },
    },
  };

  CRUDOperations[`/iapi/${entityName.toLowerCase()}s/{${entityName.toLowerCase()}Id}`] = {
    delete: {
      tags: [entityName],
      description: "Remove the given entity, by using its ID",
      parameters: [
        {
          name: `${entityName.toLowerCase()}Id`,
          in: "path",
          deescription: "ID of the entity to remove",
          required: true,
          schema: {
            type: "int",
          },
        },
      ],
      responses: {
        "200": {
          description: "Returns the entity you've just updated/created",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/EntityApiResponse`,
              },
            },
          },
        },
        "400": {
          description: "Error occurred trying to delete the entity",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/EntityApiResponse`,
              },
            },
          },
        },
      },
    },
    get: {
      tags: [entityName],
      description: "Get entity with the given ID",
      responses: {
        "200": {
          description: "The entity requested",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: `#/components/schemas/EntityApiResponse`,
                },
              },
            },
          },
        },
        "404": {
          description: "Entity was not found",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: `#/components/schemas/EntityApiResponse`,
                },
              },
            },
          },
        },
        "400": {
          description: "Error occured trying to fetch entity",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: `#/components/schemas/EntityApiResponse`,
                },
              },
            },
          },
        },
      },
    },
  };

  return CRUDOperations;
}
