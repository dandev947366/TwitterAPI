"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_middlewares_1 = require("../middlewares/users.middlewares");
var users_controllers_1 = require("../controllers/users.controllers");
var database_services_1 = require("../services/database.services");
var User_schema_1 = require("../models/schemas/User.schema");
var usersRouter = (0, express_1.Router)();
usersRouter.post('/login', users_middlewares_1.loginValidator, users_controllers_1.loginController, function (req, res) {
    res.json({
        message: "Login success"
    });
});
usersRouter.post('/register', users_controllers_1.registerController, function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    database_services_1["default"].users.insertOne(new User_schema_1["default"]({ email: email, password: password }));
    res.json({
        message: "Register success"
    });
});
exports["default"] = usersRouter;
