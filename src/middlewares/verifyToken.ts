import express from 'express'
import jwt,{Secret} from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

const verifyAccessToken = (req:express.Request,res:express.Response, next:express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            
            console.log(jwt.decode(req.cookies['jwt'],{json:true}));
            
            next();
        }
    );
}

export default verifyAccessToken