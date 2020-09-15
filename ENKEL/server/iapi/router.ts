import express, {Request, Response} from "express";
import { RouterBase } from "../RouterBase.js";
import { LoginApi } from "../iapi/login.js";

export class IApiRouter extends RouterBase {
    protected initLocalRoutes() {
        this.router.all('/', this.login.bind(this));
    }

    protected initChildRoutes() {
        // No child routes implemented yet
    }

    private async login(req: Request, res: Response) {
        const entity = await new LoginApi().getTestResponse();

        res.json(entity);
    }
}