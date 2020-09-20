export class EntityApiResponse {
  success: boolean;
  errorMessage: string;
  entity: unknown;
  operationResult: unknown;

  constructor(success = true, errorMessage = "", entity = {}, operationResult = {}) {
    this.success = success;
    this.errorMessage = errorMessage;
    this.entity = entity;
    this.operationResult = operationResult;
  }
}