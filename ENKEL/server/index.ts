import express from "express";
import { UserLoginDBO } from "../STRUDAL/UserLoginDBO.js";

const app: express.Application = express();

let userLoginDBO: UserLoginDBO = new UserLoginDBO();
userLoginDBO.getEntity().then(entity => console.log(entity));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('App is listening of port 3000')
});