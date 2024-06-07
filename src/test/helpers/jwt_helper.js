const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'testname'
            };
            const secret = 'default_secret_key'
            const options = {
                expiresIn: '1h', 
                issuer: 'testdomain.com', 
                audience: userId 
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                
                    return reject(createError(500, 'Internal Server Error'));
                }
                resolve(token);
            });
        });
    }
};
