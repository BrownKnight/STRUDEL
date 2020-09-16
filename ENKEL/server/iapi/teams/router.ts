import { Request, Response } from "express";
import { RouterBase } from "../../routerBase.js";
import { TeamsHandler } from "./handlers/teamsHandler.js";

/**
 * Router for all internal teams-based api calls. Supports the fetching, updating, and deleting
 *
 * Routes:
 * GET:/              : Get all teams
 * GET:/<team_id>     : Get teams for the given TeamID
 * PUT:/              : Create or update a team
 * DELETE:/<team_id>  : Delete a given prediciton
 */
export class IApiTeamsRouter extends RouterBase {
  private teamsHandler: TeamsHandler;

  constructor() {
    super();
    this.teamsHandler = new TeamsHandler();
  }

  protected initLocalRoutes(): void {
    this.router.get("/", this.getAllTeams.bind(this));
    this.router.put("/", this.saveTeam.bind(this));
    this.router.all("/*", this.index.bind(this));
  }

  protected initChildRoutes(): void {
    // No child routes implemented yet
  }

  private index(req: Request, res: Response) {
    res.status(404).send("Unsupprted API endpoint");
  }

  private getAllTeams(req: Request, res: Response) {
    res.json(this.teamsHandler.getAllTeams());
  }

  private saveTeam(req: Request, res: Response) {
    console.log(req.headers)
    const errorMessage: string = this.teamsHandler.saveTeam(req.body);
    console.log("got err mess:");
    console.log(errorMessage);
    if (errorMessage == "") {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: errorMessage.toString() });
    }
  }
}
