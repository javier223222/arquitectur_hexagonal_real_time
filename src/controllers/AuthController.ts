import { createUserN, getUser } from "../domain/orm/User.orm";
import { getToken } from "../utils/jwt";
import { IAuthController } from "./interfaces";
import { CreateUserRespose } from "./types/AuthResponse";
import { UserAl } from "./types/User.repo";

import bcrypt from "bcrypt"
export class AuthController implements IAuthController{
    public async createUser(user: UserAl): Promise<CreateUserRespose> {
      try{
        await createUserN(user)
        const responseEror:CreateUserRespose={success:true,message:`Usser created succefully with usuername ${user.username}`,status:201}
        return responseEror
      }catch(e:any){
         console.log(e.message)
         const responseEror:CreateUserRespose={success:false,message:"Error creating user",error:e.message,status:500}
         return responseEror
      } 
    }
    public async loginUser(user: UserAl): Promise<CreateUserRespose> {
        try{
            let userDb:any=await getUser(user.username)
            let response:CreateUserRespose;
            if(!userDb){
                  response={success:false,message:"User not found",status:401}
                  return response
            }else{
                
                if(bcrypt.compareSync(user.password,userDb.password)){
                    let token:string=await getToken(userDb)
                    response={success:true,message:"User login",status:200,token:token}
                    return response
                }
                response={success:false,message:"Password incorrect",status:401}
                return response
            }
            

           


        }catch(e:any){
            console.log(e.message)
            const responseEror:CreateUserRespose={success:false,message:"Eror to login",error:e.message,status:500}
            return responseEror
        }
    }

}