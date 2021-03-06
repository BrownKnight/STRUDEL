import { BaseDAO } from "../../STRUDAL/DAO/BaseDAO.js";
import { AnyEntity } from "../../STRUDAL/entity/EntityHelper.js";
import { EntityApiResponse } from "./apiResponse.js";

export class BasicEntityOperationHandler<TEntity extends AnyEntity> {
  protected _DAO: BaseDAO<TEntity>;

  constructor(DAO: BaseDAO<TEntity>) {
    this._DAO = DAO;
  }

  public async getAllEntities(): Promise<TEntity[]> {
    const entities = await this._DAO.getAllEntities();
    return entities;
  }

  public async getEntityById(entityStringId: string): Promise<EntityApiResponse> {
    const entityId = parseInt(entityStringId);

    const apiResponse: EntityApiResponse = new EntityApiResponse();

    if (isNaN(entityId)) {
      apiResponse.success = false;
      apiResponse.errorMessage = "Entity ID not supplied or invalid";
      return apiResponse;
    }

    try {
      const entity = await this._DAO.getEntityByID(entityId);
      if (entity !== undefined) {
        apiResponse.success = true;
        apiResponse.entity = entity;
        return apiResponse;
      } else {
        apiResponse.errorMessage = "Could not find entity!";
      }
    } catch (error) {
      apiResponse.errorMessage = error;
    }

    apiResponse.success = false;
    return apiResponse;
  }

  public async saveEntity(entity: Partial<TEntity>): Promise<EntityApiResponse> {
    const apiResponse = new EntityApiResponse();
    console.log(`Saving Entity ${entity.id}`);
    console.log(entity);

    try {
      apiResponse.entity = await this._DAO.saveEntity(entity);
    } catch (error) {
      console.error("Error occurred trying to save entity");
      console.error(error);
      apiResponse.errorMessage = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }

  public async saveMultipleEntities(entities: Partial<TEntity>[]): Promise<EntityApiResponse> {
    const apiResponse = new EntityApiResponse();
    console.log(`Saving ${entities.length} Entities`);

    try {
      apiResponse.entity = await this._DAO.saveAll(entities);
    } catch (error) {
      console.error("Error occurred trying to save entities");
      console.error(error);
      apiResponse.operationResult = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }

  public async deleteEntity(entityStringId: string): Promise<EntityApiResponse> {
    const entityId = parseInt(entityStringId);

    const apiResponse: EntityApiResponse = new EntityApiResponse();

    if (isNaN(entityId)) {
      apiResponse.success = false;
      apiResponse.errorMessage = "Entity ID not supplied or invalid";
      return apiResponse;
    }

    console.log(`Deleting Entity ${entityId}`);

    try {
      apiResponse.operationResult = await this._DAO.deleteEntity(entityId);
    } catch (error) {
      console.error("Error occurred trying to delete entity");
      console.error(error);
      apiResponse.errorMessage = error;
      apiResponse.success = false;
    }

    return apiResponse;
  }
}
