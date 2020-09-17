import "reflect-metadata";
import pkg from "typeorm";
const { getRepository } = pkg;

export class BaseDAO<T> {
  private _repository: pkg.Repository<T>;
  private _entityClass: (new () => T);

  constructor(entityClass: (new () => T)) {
    this._entityClass = entityClass;
    this._repository = getRepository<T>(this._entityClass);
  }

  async getAllEntities(): Promise<T[]> {
    return await this._repository.find();
  }

  async getEntityByID(id: string): Promise<T | undefined> {
    return await this._repository.findOne(id);
  }

  async findEntity(findConditions: pkg.FindConditions<T>): Promise<T | undefined> {
    return await this._repository.findOne(findConditions);
  } 

  async saveEntity(entity: T): Promise<void> {
    this._repository.save(entity);
  }
}