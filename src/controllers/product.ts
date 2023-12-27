import ProductModel from "../models/Product";
import  express  from "express";

export const getAllProduct = async(req:express.Request,res:express.Response) => {
    try{
       
        const paginateOptions={
            page: +req.params.page,
            limit: 12,
            sort:{price:'desc'}
        }
        const result= await ProductModel.paginate({},paginateOptions)
       
        return res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
}

export const addProduct = async(req:express.Request,res:express.Response) => {
    try{
        const products = req.body ;
        const result= await ProductModel.create(products)
       
        return res.send(result)
    }
    catch(err){
        console.log(err);

        return res.sendStatus(400)
    }
}

export const getProductByCategory = async (req:express.Request,res:express.Response) => {

    try{
        const categoryId =req.params.category;
        const paginateOptions={
            page: +req.params.page,
            limit: 12,
            sort:{price:'desc'}
        }
        const regex = new RegExp('^'+categoryId.toUpperCase())
        const products = await ProductModel.paginate({'sku':regex},paginateOptions)
        return res.json(products)
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
    
}

export const getProductById = async (req:express.Request,res:express.Response) => {

    try{
      
        const proId =req.params.id;
        
        const product = await ProductModel.findById(proId);
        return res.json(product)
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
    
}

export const updateAllProduct= async (req:express.Request,res:express.Response) => {

    try{
        const products = (await ProductModel.find())
        
        // const newProduct = products.map(product=>{
        //     product.description.forEach((value,index)=>{

        //     })
        //     return product
        // });

        // for(let product of newProduct){
        //     await ProductModel.findByIdAndUpdate(product._id,{imgLinks:product.imgLinks})
        // }
        
         return res.json(products)
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
}

// export const addProductFromJSON = async (req:express.Request,res:express.Response) => {
//     try{
//         // const products = req.body ;
//         // await ProductModel.create(products)
        
//         const products = Object.values(dataJSON).map((value)=>{
//             const tempProduct =new Product();
//             tempProduct.name=value.name;
//             tempProduct.price=parseFloat(value.price.replaceAll(".",""))
            
//             tempProduct.imgLinks=value.imgLinks.map((link,index)=>{
//                 return "images/"+value.sku+"/"+(index++)+"."+link.split(".").pop()
//             })
//             tempProduct.sku=value.sku

//             const descriptionObject = value.description.reduce((value,value2) => ({...value,...value2}), {})
//             const des: any ={}
//             for (const [key,value] of Object.entries(descriptionObject)) {
//                 if(value!="")
//                     des[key] =value
//             }
//             tempProduct.specifications=des
//             tempProduct.save();
            
//         })
         
      
        
//         return res.status(200).send(products)
//     }
//     catch(err){
//         console.log(err);

//         return res.sendStatus(400)
//     }
// }

export const findProductByName=async (req:express.Request,res:express.Response)=>{

    const keyword=req.params.name
    const regex= new RegExp('^.*'+keyword+'.*$','i')
    const product = await ProductModel.find({'name':regex})
    return res.json(product)
    
}