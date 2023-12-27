import  express  from "express";

import { getAllProduct,addProduct, getProductByCategory, getProductById, updateAllProduct, findProductByName } from "../controllers/product";
const router = express.Router();

router.get("/getAllProduct/:page",getAllProduct);

router.post("/addProduct",addProduct);

// router.post("/addProductFromJson",addProductFromJSON);

router.get("/getProductByCategory/:category/:page",getProductByCategory)

router.get("/getProductById/:id",getProductById)

router.put("/updateAllProduct",updateAllProduct)

router.get("/findProductByName/:name",findProductByName)
export {router as ProductRouter};
