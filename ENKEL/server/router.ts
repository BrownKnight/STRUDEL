import "reflect-metadata";
import express from "express";
import { initDb } from "../STRUDAL/Base.js";
import { IApiRouter } from "./iapi/router.js";
import { ApiRouter } from "./api/router.js";

const app: express.Application = express();
initDb();

app.all('/', function (req, res) {
    res.send('Welcome to the ENKEL backend!');
});

app.use('/iapi', new IApiRouter().router);
app.use('/api', new ApiRouter().router);

app.listen(3000, function() {
    console.log('App is listening of port 3000')
});