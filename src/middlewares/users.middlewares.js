"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.registerValidator = exports.loginValidator = void 0;
var express_validator_1 = require("express-validator");
var validation_1 = require("../utils/validation");
var users_services_1 = require("../services/users.services");
var loginValidator = function (req, res, next) {
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
        notEmpty: {
            errorMessage: 'Username is required'
        },
        isString: {
            errorMessage: 'Username must be a string'
        },
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: 'Username must be between 1 and 100 characters'
        },
        trim: true
    },
    email: {
        isEmail: {
            errorMessage: 'Invalid email format'
        },
        notEmpty: {
            errorMessage: 'Email is required'
        },
        trim: true,
        custom: {
            options: function (value) { return __awaiter(void 0, void 0, void 0, function () {
                var isExistEmail;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, users_services_1["default"].checkEmailExist(value)];
                        case 1:
                            isExistEmail = _a.sent();
                            if (isExistEmail) {
                                throw new Error('Email already exists');
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); }
        }
    },
    password: {
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: 'Password must be between 6 and 50 characters'
        },
        notEmpty: {
            errorMessage: 'Password is required'
        },
        isString: {
            errorMessage: 'Password must be a string'
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol'
        }
    },
    confirm_password: {
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: 'Confirm password must be between 6 and 50 characters'
        },
        notEmpty: {
            errorMessage: 'Confirm password is required'
        },
        isString: {
            errorMessage: 'Confirm password must be a string'
        },
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true
            },
            errorMessage: 'Date of birth must be a valid ISO 8601 date'
        }
    }
}));
