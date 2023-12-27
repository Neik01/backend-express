import mongoose, { Schema, Types, InferSchemaType } from 'mongoose';
import { UserModel } from './User';

const cartItemSchema = new Schema({
  
  product:{
    type:Types.ObjectId,
    ref:'Product'
  },
  quantity:{
    type:Number,
    require:true
    
  },
  order:{
    type:Types.ObjectId,
    ref:'Order'
  }
  },
  {
    toJSON:{virtuals:true}
  }
  )

// cartItemSchema.virtual('product',{
//   ref:'Product',
//   localField:'product',
//   foreignField:'_id'
// })

export type CartItemType = InferSchemaType<typeof cartItemSchema >;

const CartItem = mongoose.model('CartItem', cartItemSchema );
export default CartItem