"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_middlewares_1 = require("../middlewares/users.middlewares");
var users_controllers_1 = require("../controllers/users.controllers");
var usersRouter = (0, express_1.Router)();
usersRouter.post('/login', users_middlewares_1.loginValidator, users_controllers_1.loginController);
/** Description: Register a new user
* Path: /register
* Method: POST
* Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
*/
usersRouter.post('/register', users_middlewares_1.registerValidator, users_controllers_1.registerController);
exports["default"] = usersRouter;
