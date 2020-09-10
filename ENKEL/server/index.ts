import "reflect-metadata";
import express from "express";
import { IApiRouter } from "./iapi/router.js";

const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/iapi', new IApiRouter().router);

app.listen(3000, function() {
    console.log('App is listening of port 3000')
});