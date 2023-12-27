import  express  from "express";
import OrderModel from "../models/Order";
import CartItem from "../models/Cart_Item";
import jwt from "jsonwebtoken"
export const addOrder = async(req:express.Request,res:express.Response) => {
    try{

        const user_id_token= req.cookies['jwt'];

        const user_id= jwt.decode(user_id_token,{json:true}) as {_id:string};
        console.log('user_id: '+ user_id._id);
        

        const products = req.body ;
             
        const order=new OrderModel({
            user:user_id._id,            
            address:products.address,
            phone:products.phone,
        })
        
        const savedOrder=await order.save();

        let cart=products.cart.map((item:any) =>{
            return {
                product:item.product._id,
                quantity:item.quantity,
                order:savedOrder._id
            }
        })
    
       await CartItem.create(cart);

        return res.json({'message':'ok'})
    }
    catch(err){
        console.log(err);

        return res.sendStatus(400)
    }
}

export const getOrder = async(req:express.Request,res:express.Response) => {
    try{
        
        const user_token= req.cookies['jwt'];

        const user= jwt.decode(user_token,{json:true}) as {_id:string}; 

        const orders = await OrderModel.find({'user':user._id}).populate({
            path:'user',   
            select:"-password -refresh_token"
        })
        .populate({  
            path:'cart',
            populate:{path:'product'}
        }).exec();
       
        return res.json(orders)

    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
}
