import "reflect-metadata";
import express from "express";
import { initDb } from "../STRUDAL/Base.js";
import { IApiRouter } from "./iapi/router.js";
import { ApiRouter } from "./api/router.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { LoginHandler } from "./loginHandler.js";
// Wait for a connection to be established before starting the server
await initDb();

const app: express.Application = express();

app.use(express.json());
app.use(authMiddleware);

app.all("/", function (req, res) {
  res.send("Welcome to the ENKEL backend!");
});

const loginHandler = new LoginHandler();

app.post("/login", loginHandler.login.bind(loginHandler));

app.use("/iapi", new IApiRouter().router);
app.use("/api", new ApiRouter().router);

app.listen(3000, function () {
  console.log("App is listening of port 3000");
});
