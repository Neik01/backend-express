import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import {ProductRouter} from './routes/product';
import { OrderRouter } from './routes/order';
import { AuthRouter } from './routes/auth';
import verifyAccessToken from './middlewares/verifyToken';

const app= express();

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors({
    origin:['http://localhost:4200','http://192.168.1.21'],
    
    optionsSuccessStatus: 200,
    methods:['GET', 'PUT', 'POST','DELETE'],
    allowedHeaders:['Content-Type','Authorization','Set-Cookie'],
    credentials:true
}))

app.use("/images",express.static(path.join(__dirname,'./public/images')));



app.use('/api/product',ProductRouter);
app.use('/api/auth',AuthRouter);
app.use(verifyAccessToken);
app.use('/api/order',OrderRouter);


mongoose.
    connect("mongodb+srv://NTK:011020Kk@cluster0.epneqay.mongodb.net/PC_SHOP")
    .then(result =>{
        app.listen({port : 8080},()=>{
            console.log('Server is running on port 8080');      
        })
    })
    .catch(err =>{
        console.log('Đã có lỗi khi kết nối db: \n'+err);
        
    })
