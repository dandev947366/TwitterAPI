import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { validate } from '../utils/validation';
import usersService from '../services/users.services';
import { USERS_MESSAGES } from '../constants/message';
//ANCHOR -  LOGIN VALIDATOR
export const loginValidator = validate(checkSchema({
    email: {
        isEmail: {
            errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
        },
        notEmpty: {
            errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED,
        },
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: USERS_MESSAGES.PASSWORD_LENGTH,
        },
        notEmpty: {
            errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
        },
    },
}, ['body']));

//ANCHOR -  REGISTER VALIDATOR
export const registerValidator = validate(checkSchema({
    username: {
        notEmpty: {
            errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED,
        },
        isString: {
            errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING,
        },
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
        trim: true,
    },
    email: {
        isEmail: {
            errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
        },
        notEmpty: {
            errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED,
        },
        trim: true,
        // custom: {
        //     options: async (value: string) => {
        //         const isExistEmail = await usersService.checkEmailExist(value);
        //         if (isExistEmail) {
        //             throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS);
        //         }
        //         return true;
        //     },
        // },
    },
    password: {
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: USERS_MESSAGES.PASSWORD_LENGTH,
        },
        notEmpty: {
            errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
        },
        isString: {
            errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING,
        },
        // custom: {
        //     options: (value: string, { req }) => {
        //         if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(value)) {
        //             throw new Error(USERS_MESSAGES.PASSWORD_MUST_BE_STRONG);
        //         }
        //         return true;
        //     },
        // },
    },
    confirm_password: {
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG,
        },
        notEmpty: {
            errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED,
        },
        isString: {
            errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING,
        },
        // custom: {
        //     options: (value: string, { req }) => {
        //         if (value !== req.body.password) {
        //             throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MATCH);
        //         }
        //         return true;
        //     },
        // },
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true,
            },
            errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_ISO8601,
        },
    },
}));

//ANCHOR -  ACCESS TOKEN VALIDATOR
export const accessTokenValidator = validate(
    checkSchema({
        Authorization:{ 
            notEmpty:{
                errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
            },
            custom:{
                options: async(value, {req})=>{
                    const access_token = value.replace('Bearer ', '')
                    
                
                }
            }
        }
    }, ['headers'])
)