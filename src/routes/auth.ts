import  express  from "express";
import { authenticatedUser, handleLogin, handleRegistration } from "../controllers/auth";
import verifyAccessToken from '../middlewares/verifyToken'

const router =express.Router();

router.post("/login",handleLogin);

router.post("/registration",handleRegistration)

router.get('/user',verifyAccessToken,authenticatedUser)

router.get("/refresh_token",)
export {router as AuthRouter};