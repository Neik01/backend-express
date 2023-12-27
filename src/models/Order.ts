import mongoose, { Schema, Types, InferSchemaType } from 'mongoose';
import CartItemType  from './Cart_Item';

const orderSchema = new Schema(
  {
  address:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  user:{
    type:Types.ObjectId,
    ref:'User'
  }
  },
  {
    toJSON: { virtuals: true }
  }
)

export type Order = InferSchemaType<typeof orderSchema >;
orderSchema.virtual('cart',{
  ref:'CartItem',
  localField:'_id',
  foreignField:'order'
});

const OrderModel = mongoose.model('Order', orderSchema );
export default OrderModel