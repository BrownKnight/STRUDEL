import { AdminOnly } from "../../middleware/adminOnlyDecorator.js";
import { EntityRouter } from "../entityRouter.js";
import { ScheduleHandler } from "./scheduleHandler.js";
import { Request, Response } from "express";

/**
 * Router for all internal schedule-based api calls. Supports the fetching, updating, and deleting of scheduled jobs
 * through the standard Entity API
 *
 * Routes:
 *    GET:/joblist : Returns a list of possible jobs that can be run
 */
export class IApiSchedulesRouter extends EntityRouter {
  private _scheduleHandler: ScheduleHandler;
  constructor() {
    const predictionsHandler = new ScheduleHandler();
    super(predictionsHandler);

    this._scheduleHandler = predictionsHandler;

    // Refresh the schedule when this router is created (i.e. at startup)
    this._scheduleHandler.refreshSchedule();
  }

  protected initLocalRoutes(): void {
    this.router.get("/joblist", this.getJobList.bind(this));
    this.router.post("/refresh", this.refreshSchedule.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes
  }

  @AdminOnly()
  protected async saveEntity(req: Request, res: Response): Promise<void> {
    await super.saveEntity(req, res);
    await this._scheduleHandler.refreshSchedule();
  }

  @AdminOnly()
  protected async deleteEntity(req: Request, res: Response): Promise<void> {
    await super.deleteEntity(req, res);
    await this._scheduleHandler.refreshSchedule();
  }

  private async getJobList(req: Request, res: Response): Promise<void> {
    const jobs = this._scheduleHandler.getJobList();
    res.status(200).json(jobs);
  }

  private async refreshSchedule(req: Request, res: Response): Promise<void> {
    await this._scheduleHandler.refreshSchedule();
    res.status(200).json({ success: true });
  }
}
