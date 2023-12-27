import  express  from "express";
import { addOrder, getOrder } from "../controllers/order";

const router =express.Router();

router.post("/addOrder",addOrder);

router.get("/getOrder",getOrder)
export {router as OrderRouter};