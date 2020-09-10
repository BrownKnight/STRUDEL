import express, {Request, Response} from "express";
import { RouterBase } from "../RouterBase.js";
import { LoginApi } from "../iapi/login";

export class IApiRouter extends RouterBase {
    protected initLocalRoutes() {
        this.router.all('/', this.login.bind(this));
    }

    protected initChildRoutes() {
        // No child routes implemented yet
    }

    private login(req: Request, res: Response) {
        res.json(new LoginApi().getTestResponse());
    }
}