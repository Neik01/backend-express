import mongoose, { Schema, Types, InferSchemaType } from 'mongoose';
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    specifications:{
        type:Object
    }
    ,
    sku:{
        type:String,
        require:true
    },
    imgLinks:{
        type:[String]
    }
})

productSchema.plugin(paginate);

interface ProductDocument extends mongoose.Document{}


export type ProductType = InferSchemaType<typeof productSchema>;

const ProductModel = mongoose.model<ProductDocument,mongoose.PaginateModel<ProductDocument>>('Product', productSchema);
export default ProductModel