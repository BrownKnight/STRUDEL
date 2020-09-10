import express from "express";

export abstract class RouterBase {
    router: express.Router = express.Router();

    constructor() {
        this.initLocalRoutes();
        this.initChildRoutes();
    }

    protected abstract initLocalRoutes(): void 
    protected abstract initChildRoutes(): void
}