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
              $ref: `#/components/schemas/${entityName}`,
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
                $ref: `#/components/schemas/${entityName}`,
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
    },
  };

  return CRUDOperations;
}