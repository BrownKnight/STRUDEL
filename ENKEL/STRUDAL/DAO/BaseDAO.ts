import "reflect-metadata";
import pkg, { ObjectLiteral } from "typeorm";
const { getRepository } = pkg;

/**
 * Base DAO for all entities' DAOs, implements basic entity CRUD operations
 */
export class BaseDAO<TEntity extends ObjectLiteral> {
  private _repository: pkg.Repository<TEntity>;
  private _entityClass: new () => TEntity;

  constructor(entityClass: new () => TEntity) {
    this._entityClass = entityClass;
    this._repository = getRepository<TEntity>(this._entityClass);
  }

  async getAllEntities(): Promise<TEntity[]> {
    return this._repository.find();
  }

  async getEntityByID(id: string): Promise<TEntity | undefined> {
    return this._repository.findOne(id);
  }

  async findEntity(findConditions: pkg.FindConditions<TEntity>): Promise<TEntity | undefined> {
    return this._repository.findOne(findConditions);
  }

  async saveEntity(entity: TEntity): Promise<TEntity> {
    return this._repository.save(entity);
  }

  async deleteEntity(entityId: number): Promise<pkg.DeleteResult> {
    return this._repository.delete(entityId);
  }
}
