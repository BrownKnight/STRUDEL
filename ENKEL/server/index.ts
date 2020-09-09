import express from "express";

const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('App is listening of port 3000')
});