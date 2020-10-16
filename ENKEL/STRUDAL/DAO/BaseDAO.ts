import "reflect-metadata";
import pkg, { ObjectLiteral } from "typeorm";
const { getRepository } = pkg;

/**
 * Base DAO for all entities' DAOs, implements basic entity CRUD operations
 */
export class BaseDAO<TEntity extends ObjectLiteral> {
  protected _repository: pkg.Repository<TEntity>;
  private _entityClass: new () => TEntity;

  constructor(entityClass: new () => TEntity) {
    this._entityClass = entityClass;
    this._repository = getRepository<TEntity>(this._entityClass);
  }

  async getAllEntities(findOptions: pkg.FindManyOptions<TEntity> = {}): Promise<TEntity[]> {
    return this._repository.find(findOptions);
  }

  async getEntityByID(id: number, findOptions: pkg.FindOneOptions<TEntity> = {}): Promise<TEntity | undefined> {
    return this._repository.findOne(id, findOptions);
  }

  async findEntity(findOptions: pkg.FindOneOptions<TEntity>): Promise<TEntity | undefined> {
    return this._repository.findOne(findOptions);
  }

  async saveEntity(entity: Partial<TEntity>): Promise<TEntity> {
    // Create the entity from the request so that it calls BeforeInsert/BeforeUpdate correctly
    const e = this._repository.create(entity);
    return this._repository.save(e);
  }

  async saveAll(entities: Partial<TEntity>[]): Promise<TEntity[]> {
    return this._repository.save(entities);
  }

  async deleteEntity(entityId: number): Promise<pkg.DeleteResult> {
    return this._repository.delete(entityId);
  }
}
