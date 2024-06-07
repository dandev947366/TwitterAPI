const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const secret = 'default_secret_key';
const issuer = 'testdomain.com';
const audience = 'your_audience';

module.exports = {
    // Sign Access Token
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
            };
            const options = {
                expiresIn: '1h', // Adjust as needed
                issuer,
                audience
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.error(err);
                    reject(createError.InternalServerError());
                } else {
                    resolve(token);
                }
            });
        });
    },

    // Verify Access Token
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized());
        }
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, secret, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized('Invalid token'));
                } else if (err.name === 'TokenExpiredError') {
                    return next(createError.Unauthorized('Token expired'));
                } else {
                    return next(createError.Unauthorized('Token verification failed'));
                }
            }
            req.payload = payload;
            next();
        });
    },

    // Sign Refresh Token
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
            };
            const options = {
                expiresIn: '7d', // Adjust as needed
                issuer,
                audience
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.error(err);
                    reject(createError.InternalServerError());
                } else {
                    resolve(token);
                }
            });
        });
    },

    // Verify Refresh Token
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, secret, (err, payload) => {
                if (err) {
                    return reject(createError.Unauthorized('Invalid refresh token'));
                }
                const userId = payload.userId;
                resolve(userId);
            });
        });
    }
};
