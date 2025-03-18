import express,{ Router } from "express";
import AuthController from "../controllers/user.controller";

const router:Router=express.Router()


router.route("/register").post(AuthController.registerUser)

export default router