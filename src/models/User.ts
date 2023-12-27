import mongoose, { Schema, Types, InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String,require:true },
    username: { type: String, required: true },

    password:{
      type:String,
      require:true
    },
   
    refresh_token:{
      type:String,
      require:false
    }
  },
  {
    toJSON:{virtuals:true}
  }
  );

  UserSchema.virtual('order',{
    ref:'Order',
    localField:'_id',
    foreignField:'user'
  })
export const UserModel = mongoose.model('User', UserSchema);