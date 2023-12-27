import {Router} from 'express';
const testRouter2= Router();

testRouter2.get("/hi",(req,res,next)=>{
    res.send("Hello")
})


export default testRouter2

