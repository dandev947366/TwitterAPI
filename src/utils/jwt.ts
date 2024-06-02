import jwt from 'jsonwebtoken'

const signToken = (payload: any, privateKey=process.env.JWT_SECRET as string, options:jwt.SignOptions) =>{
   return new Promise<string>((resolve, reject)=>{
    jwt.sign(payload, privateKey, options, (error, token)=>{
    
        if(error){throw reject(error)}
        resolve(token as string)
    
    })
   
   
   
   })
}