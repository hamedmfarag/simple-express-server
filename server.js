var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");

var websocket = require("./websocket");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

websocket();

app.get('/', function (req, res) {
    res.send({ message: "Hello Server!" });
});

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 8080')
})
