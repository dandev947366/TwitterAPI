"use strict";
exports.__esModule = true;
exports.registerValidator = exports.loginValidator = void 0;
var express_validator_1 = require("express-validator");
var validation_1 = require("../utils/validation");
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
exports.registerValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    username: {
        notEmpty: true,
        isString: true,
        isLength: { options: { min: 1, max: 100 } },
        trim: true
    },
    email: {
        isEmail: true,
        notEmpty: true,
        trim: true
    },
    password: {
        isLength: { options: { min: 6, max: 50 } },
        notEmpty: true,
        isString: true,
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        }
    },
    confirm_password: {
        isLength: { options: { min: 6, max: 50 } },
        notEmpty: true,
        isString: true,
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true
            }
        }
    }
}));
