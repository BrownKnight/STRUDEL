import { AnyEntity } from "../../STRUDAL/entity/EntityHelper.js";

export class EntityApiResponse {
  success: boolean;
  errorMessage: string;
  entity: AnyEntity | Array<AnyEntity>;
  operationResult: unknown;

  constructor(success = true, errorMessage = "", entity = {}, operationResult = {}) {
    this.success = success;
    this.errorMessage = errorMessage;
    this.entity = entity;
    this.operationResult = operationResult;
  }
}

export const EntityApiResponseSchema = {
  EntityApiResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      errorMessage: {
        type: "string",
      },
      operationResult: {
        type: "string",
      },
      entity: {
        anyOf: [
          { $ref: "#/components/schemas/Fixture" },
          { $ref: "#/components/schemas/Prediction" },
          { $ref: "#/components/schemas/Team" },
          { $ref: "#/components/schemas/UserLogin" },
          { $ref: "#/components/schemas/User" },
          { $ref: "#/components/schemas/AnalyticsItem" },
          { $ref: "#/components/schemas/MinedData" },
        ],
      },
    },
  },
};
