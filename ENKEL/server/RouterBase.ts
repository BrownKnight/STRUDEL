import express from "express";

export abstract class RouterBase {
    router: express.Router = express.Router();

    constructor() {
        this.initLocalRoutes();
        this.initChildRoutes();
    }

    /**
     * Override to initialise all route handlers for the current level
     */
    protected abstract initLocalRoutes(): void 

    /**
     * Override to initialise any routers for the next level down in the tree
     */
    protected abstract initChildRoutes(): void
}