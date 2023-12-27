import express from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../models/User";
import jwt,{Secret} from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

export const handleLogin= async (req:express.Request,res:express.Response)=>{

    const { email, password } = req.body;
    
    
    console.log('email: '+email+"\npassword: "+password);
    
    if (!email || !password) return res.status(400).json({ 'message': 'Không được để trống email và mật khẩu' });
    const foundUser =await UserModel.findOne({'email':email})
    if (!foundUser) return res.status(401).json({'message': 'Sai email hoặc mật khẩu.'}); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password!);
    if (match) {
        // create JWT
        const access_token= jwt.sign(
            {"_id":foundUser._id.toString()},
            process.env.ACCESS_TOKEN_SECRET as Secret,
            {expiresIn:'5m'}
            );
        
        const refresh_token = jwt.sign(
            {"_id":foundUser._id.toString()},
            process.env.REFRESH_TOKEN_SECRET as Secret,
            {expiresIn:'1d'}
        )
        
        const salt = await bcrypt.genSalt(12)
        const hashed_refresh_token = await bcrypt.hash(refresh_token,salt)

        await UserModel.findByIdAndUpdate(foundUser._id,{
            'refresh_token':hashed_refresh_token
        })
       
        res.cookie('jwt',refresh_token,{
          
            maxAge:1000*60*60*24*7, //7d
            
        });
        

        return res.status(200).json(access_token);
    } else {
        res.status(401).json({'message': 'Sai email hoặc mật khẩu.'});
    }
}


export const handleRegistration= async (req:express.Request,res:express.Response)=>{
    const { username,email, password } = req.body;

    
    const foundUser =await UserModel.findOne({'email':email})
    if(foundUser) return res.status(409).json({'message':'Email này đã được sử dụng'});

    const salt = await bcrypt.genSalt(12)
    const hashedPass= await bcrypt.hash(password,salt);

    const user =new UserModel({
        username:username,
        email:email,
        password:hashedPass
    })

    await user.save()
    
    res.status(201).send({'message':'Đăng ký thành công'})
}

export const authenticatedUser=async (req:express.Request,res:express.Response) => {
 
    
    const refresh_token_cookie= req.cookies['jwt']

    if(!refresh_token_cookie) return res.sendStatus(401)

    const decodedToken = jwt.decode(refresh_token_cookie,{json:true})
    
    const foundedUser = await UserModel.findById(decodedToken!._id).select('-password -refresh_token')
    
    res.send(foundedUser)
}



export const reissueRefreshToken=async (req:express.Request,res:express.Response) => {
   
   try {
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await UserModel.findOne({'refresh_token':refreshToken});
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        (err: any, decoded:any) => {
            if (err || foundUser._id.toString() !== decoded._id.toString()) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "_id": foundUser._id.toString() },
                process.env.ACCESS_TOKEN_SECRET as Secret,
                { expiresIn: '5m' }
            );
            res.json({ accessToken })
        }
    );
   } catch (error) {
    console.log(error);
    
    res.send(400)
   }
}