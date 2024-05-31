"use strict";
exports.__esModule = true;
exports.loginController = void 0;
var loginController = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email == 'dan@gmail.com' && password == '123456') {
        return res.status(200).json({
            message: "Login success"
        });
    }
    return res.status(400).json({
        error: "Login failed"
    });
};
exports.loginController = loginController;
