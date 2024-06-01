import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { validate } from '../utils/validation';
import usersService from '../services/users.services';

// LOGIN VALIDATOR
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Missing email or password',
        });
    }

    next();
};

// REGISTER VALIDATOR
export const registerValidator = validate(
    checkSchema({
        username: {
            notEmpty: {
                errorMessage: 'Username is required',
            },
            isString: {
                errorMessage: 'Username must be a string',
            },
            isLength: {
                options: { min: 1, max: 100 },
                errorMessage: 'Username must be between 1 and 100 characters',
            },
            trim: true,
        },
        email: {
            isEmail: {
                errorMessage: 'Invalid email format',
            },
            notEmpty: {
                errorMessage: 'Email is required',
            },
            trim: true,
            custom: {
                options: async (value: string) => {
                    const isExistEmail = await usersService.checkEmailExist(value);
                    if (isExistEmail) {
                        throw new Error('Email already exists');
                    }
                    return true;
                },
            },
        },
        password: {
            isLength: {
                options: { min: 6, max: 50 },
                errorMessage: 'Password must be between 6 and 50 characters',
            },
            notEmpty: {
                errorMessage: 'Password is required',
            },
            isString: {
                errorMessage: 'Password must be a string',
            },
            isStrongPassword: {
                options: {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                },
                errorMessage:
                    'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
            },
        },
        confirm_password: {
            isLength: {
                options: { min: 6, max: 50 },
                errorMessage: 'Confirm password must be between 6 and 50 characters',
            },
            notEmpty: {
                errorMessage: 'Confirm password is required',
            },
            isString: {
                errorMessage: 'Confirm password must be a string',
            },
            custom: {
                options: (value: string, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Passwords do not match');
                    }
                    return true;
                },
            },
        },
        date_of_birth: {
            isISO8601: {
                options: {
                    strict: true,
                    strictSeparator: true,
                },
                errorMessage: 'Date of birth must be a valid ISO 8601 date',
            },
        },
    })
);
