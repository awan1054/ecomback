

import { Request,Response } from "express"
import User from "../database/models/userModel"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
class AuthController{
  public static async registerUser(req:Request,res:Response):Promise<void>{
      try {
         const {username,email,password,role}=req.body
         if(!username||!email||!password){
              res.status(400).json({
         message:"please provide username password and email"})
         return
         
              }
              await User.create({
                 username,
                 email,password:bcrypt.hashSync(password,8),///10,12,8,
                 role:role
              })
              res.status(200).json({
                 message:"User registered successfully"
              })
      } catch (error:any) {
         res.status(500).json({
            message:error.message
         })
      }
    }


public static async loginUser(req:Request,res:Response):Promise<void>{
 
     try {
      const {email,password}=req.body
      if(!email||!password)
      {
         res.status(400).json({
            message:"Please provide email and password"
         })
         return 
      }
      const [data]=await User.findAll({
         where:{
            email:email
         }
      })
      if(!data){
         res.status(400).json({
            message:"NO user with that email"
         })
         return
      }
   //checkk password
      const isMatched=bcrypt.compareSync(password,data.password)
      if(!isMatched){
   res.status(403).json({
      message:"Invalid email or password"
   })
   return
    }
    const token=jwt.sign({id:data.id},"hahaha",{expiresIn:"20d"})
    res.status(200).json({
      message:"login success",
      data:token
   })
     } catch (error:any) {
      res.status(500).json({
         message:error.message
      })
     }
   }
   


}



export default AuthController