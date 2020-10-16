import { Request, Response } from "express";
import { AnyEntity, sanitiseEntity } from "../../STRUDAL/entity/EntityHelper.js";
import { RouterBase } from "../routerBase.js";
import { EntityApiResponse } from "./apiResponse.js";
import { BasicEntityOperationHandler } from "./basicEntityOperationHandler.js";

/**
 * Router for all internal entity-based api calls. Supports the fetching, updating, and deleting of any entity
 *
 * Routes:
 * GET:/              : Get all entites
 * GET:/<entity_id>   : Get user for the given entityId
 * PUT:/              : Create or update a entity
 * DELETE:/<entity_id>  : Delete a given entity
 */
export abstract class EntityRouter extends RouterBase {
  protected _entityHandler: BasicEntityOperationHandler<AnyEntity>;

  constructor(entityHandler: BasicEntityOperationHandler<AnyEntity>) {
    super();
    this._entityHandler = entityHandler;
    this.initBasicOperationRoutes();
  }

  protected abstract initLocalRoutes(): void;

  protected abstract initChildRoutes(): void;

  private initBasicOperationRoutes() {
    this.router.get("/", this.getAllEntities.bind(this));
    this.router.get("/:entityId", this.getEntityById.bind(this));
    this.router.put("/", this.saveEntity.bind(this));
    this.router.delete("/:entityId", this.deleteEntity.bind(this));
  }

  /**
   * Handle a request to retrieve all entities of the type supported by this handler
   */
  private async getAllEntities(req: Request, res: Response) {
    // Data is sanitised (i.e. passwords removed) in the DAO if this is UserLogin,
    //  so no need to do it here
    res.status(200).json(await this._entityHandler.getAllEntities());
  }

  /**
   * Handle a request to retrieve an entities based on its id
   */
  private async getEntityById(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._entityHandler.getEntityById(req.params["entityId"]);

    apiResponse.entity = sanitiseEntity(apiResponse.entity as AnyEntity);

    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      if (apiResponse.errorMessage == "Could not find entity!") {
        res.status(404).json(apiResponse);
      } else {
        res.status(400).json(apiResponse);
      }
    }
  }

  /**
   * Handle a request to save the entity given in the requests body
   */
  private async saveEntity(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._entityHandler.saveEntity(req.body);

    apiResponse.entity = sanitiseEntity(apiResponse.entity as AnyEntity);

    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }

  /**
   * Handle a request to save the entity given in the requests body
   */
  private async deleteEntity(req: Request, res: Response) {
    const apiResponse: EntityApiResponse = await this._entityHandler.deleteEntity(req.params["entityId"]);

    if (apiResponse.success) {
      res.status(200).json(apiResponse);
    } else {
      res.status(400).json(apiResponse);
    }
  }
}
