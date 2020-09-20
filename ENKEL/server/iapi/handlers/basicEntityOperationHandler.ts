import { BaseDAO } from "../../../STRUDAL/DAO/BaseDAO.js";
import { Entity } from "../../../STRUDAL/entity/EntityType.js";
import { EntityApiResponse } from "../apiResponse.js";

export class BasicEntityOperationHandler<TEntity extends Entity> {
  private _DAO: BaseDAO<TEntity>;

  constructor(DAO: BaseDAO<TEntity>) {
    this._DAO = DAO;
  }

  public async getAllEntities(): Promise<TEntity[]> {
    return await this._DAO.getAllEntities();
  }

  public async saveEntity(entity: TEntity): Promise<EntityApiResponse> {
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

  public async deleteEntity(entityStringId: string): Promise<EntityApiResponse> {
    const entityId = parseInt(entityStringId);

    const apiResponse = new EntityApiResponse();
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
