import "reflect-metadata";
import express from "express";
import { initDb } from "../STRUDAL/Base.js";
import { IApiRouter } from "./iapi/router.js";
import { ApiRouter } from "./api/router.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { LoginHandler } from "./loginHandler.js";
//import path from "path";
import compression from "compression";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger.js";
import moment from "moment";

// Wait for a connection to be established before starting the server
await initDb();

const app: express.Application = express();

// Sets a few headers to try to improve security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  console.log("Not using helmet headers");
}
app.use(express.json({ limit: "50mb" }));
app.use(authMiddleware);

app.all("/", function (req, res) {
  res.send("Welcome to the ENKEL backend!");
});

const loginHandler = new LoginHandler();

app.post("/login", loginHandler.login.bind(loginHandler));
app.put("/login/register", loginHandler.register.bind(loginHandler));

// Compress all the responses
app.use(compression());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/iapi", new IApiRouter().router);
app.use("/api", new ApiRouter().router);

app.listen(3000, function () {
  console.log("App is listening of port 3000");
});

// Our "weeks" start on a tuesday, so set start of week to tuesday
moment.locale("en", {
  week: {
    dow: 2,
  },
});
