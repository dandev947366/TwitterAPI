"use strict";
exports.__esModule = true;
exports.loginValidator = void 0;
var loginValidator = function (req, res, next) {
    console.log(req.body);
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Missing email or password'
        });
    }
    next();
};
exports.loginValidator = loginValidator;
