import { Request, Response } from "express";
import { RouterBase } from "../../../routerBase.js";
import fetch from "node-fetch";
import { AdminOnly } from "../../../middleware/adminOnlyDecorator.js";

/**
 * Router to handle requests to the APPLE prediction engine
 *
 * Routes:
 * POST:/external/apple/tasks            : Trigger an APPLE engine run
 * GET:/external/apple/tasks/{taskId}    : Get status of given APPLE task
 */
export class IApiAppleRouter extends RouterBase {
  constructor() {
    super();
  }

  protected initLocalRoutes(): void {
    this.router.post("/tasks", this.triggerAppleTask.bind(this));
    this.router.get("/tasks/:taskId", this.getAppleTaskStatus.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  @AdminOnly()
  private async triggerAppleTask(req: Request, res: Response) {
    // TODO: Validate the request body

    fetch(`${process.env.APPLE_URL}/apple/v1.0/tasks`, {
      method: "POST",
      body: req.body,
    })
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .then((json) => {
        res.status(200).json(json);
      })
      .catch((error) => res.status(500).send(error));
  }

  @AdminOnly()
  private async getAppleTaskStatus(req: Request, res: Response) {
    // TODO: Validate the request body

    fetch(`${process.env.APPLE_URL}/apple/v1.0/tasks`, {})
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .then((json) => {
        const taskId = req.params["taskId"];
        if (json.length > 0 && json[taskId]) {
          res.status(200).json(json[taskId]);
        }
      })
      .catch((error) => res.status(500).send(error));
  }
}
