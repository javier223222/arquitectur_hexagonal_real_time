import jwt from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import dotenv from "dotenv"

dotenv.config()
const secret:string=process.env.SECRETTEXT||"d"
/**
 * 
 * @param {Request} req Original request previus middleware of verification jwt
 * @param {Response} res  Original response previus middleware of verification jwt
 * @param {NextFunction} next next function
 * @returns   response with status 403 if token not found or 500 if token is not valid
 */
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
   //   check

   const token=req.header("x-access-token")||"s";
   console.log(token)
     
   if(!token){
     return res.status(403).json({message:"token no encontrado"})
   }

   jwt.verify(token,secret,(err:any,decoded:any)=>{
    if(err){
      return res.status(401).json({message:"no autorizado"})
    }
    
    next();

   })
  

}