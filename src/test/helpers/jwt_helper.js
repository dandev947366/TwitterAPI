const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const secret = 'default_secret_key'
const refresh_secret='test_refresh_key'
const issuer = 'testdomain.com'
module.exports = {

    //ANCHOR - SIGN ACCESS TOKEN
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'testname'
            };
            
            const options = {
                expiresIn: '15s', 
                issuer, 
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
    
    //ANCHOR - VERIFY ACCESS TOKEN
    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization'])
        {
            return next(createError.Unauthorized())
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, secret, (err, payload) => {
            if (err) {
              if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized('Invalid token'));
              } else if (err.name === 'TokenExpiredError') {
                return next(createError.Unauthorized('Token expired'));
              } else {
                return next(createError.Unauthorized(err.message));
              }
             
            }
            
            req.payload = payload
            next()
        })
    },
    
    //ANCHOR - SIGN REFRESH TOKEN
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
            }
            const options = {
            
                expiresIn: '1m',
                issuer,
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token)=>{
                if(err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
                
            })
        
        })
    
    },
    
    //ANCHOR - VERIFY REFRESH TOKEN
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, refresh_secret, (err, payload) => {
                if (err) {
                    return reject(createError.Unauthorized());
                }
                const userId = payload.aud;
                console.log(userId)
                resolve(userId);
            });
        });
    }
    
};
