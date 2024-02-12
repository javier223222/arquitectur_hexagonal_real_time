import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret:string=process.env.SECRETTEXT||"d"
export const verify=(socket:any,next:any)=>{

    try{
   const token=socket.handshake.auth.token

   jwt.verify(token,secret,(err:any,decoded:any)=>{
    if(err){
        next(err)
    }
    socket.user=decoded
    next()
   })
    }catch(e){
      next(e)
    }
}