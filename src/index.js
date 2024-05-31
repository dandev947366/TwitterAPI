"use strict";
exports.__esModule = true;
var express = require('express');
var users_routes_1 = require("./routes/users.routes");
var database_services_1 = require("./services/database.services");
var app = express();
var port = 3000;
app.use(express.json());
app.use('/users', users_routes_1["default"]);
database_services_1["default"].connect();
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
