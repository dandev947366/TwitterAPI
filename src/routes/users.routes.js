"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_middlewares_1 = require("../middlewares/users.middlewares");
var usersRouter = (0, express_1.Router)();
usersRouter.post('/login', users_middlewares_1.loginValidator, function (req, res) {
    res.json({
        message: "Login success"
    });
});
exports["default"] = usersRouter;
