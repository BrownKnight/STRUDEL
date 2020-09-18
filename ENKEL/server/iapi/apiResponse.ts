export class EntityApiResponse {
  success: boolean;
  errorMessage: string;
  entity: object;

  constructor(success = true, errorMessage = "", entity = {}) {
    this.success = success;
    this.errorMessage = errorMessage;
    this.entity = entity;
  }
}