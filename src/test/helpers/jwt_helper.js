const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const secret = 'default_secret_key'
const expiresIn = '15s'
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'testname'
            };
            
            const options = {
                expiresIn, 
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
    },
    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization'])
        {
            return next(createError.Unauthorized())
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, secret, (err, payload)=>{
            if(err) {return next(createError.Unauthorized())}
            req.payload = payload
            next()
        })
    }
};
