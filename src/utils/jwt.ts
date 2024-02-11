import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
const secret:string=process.env.SECRETTEXT as string
export const getToken=async(payload:any):Promise<string>=>{
         return jwt.sign(payload,secret,{expiresIn:"6h"})
}

export const getToekndata=async(token:string):Promise<any>=>{
    let data=null
    jwt.verify(token,`${secret}`,(err,decoded)=>{
        if(err){
            console.log("error al obtener el token",err.message)
        }else{
            data=decoded
        }
    })
    return data
}