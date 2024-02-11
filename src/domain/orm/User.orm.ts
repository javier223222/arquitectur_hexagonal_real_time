import { UserAl } from "../../controllers/types/User.repo";
import { db } from "../repositories/myql.repo";

export const createUserN=async(user:UserAl):Promise<UserAl|boolean>=>{
    try{
     return  db.user.create({
        data:{
            username:user.username,
            email:user.email,
            password:user.password

        },
        select:{
            id:true,
            username:true,
            email:true,
            password:true
        }
       })
       

    
    }catch(e:any){
        console.log(e.message)
        return false
    }
}


export const getUser=async(usernamee:string):Promise<UserAl|boolean>=>{
   try{
    const answer=await db.user.findUnique({
        where:{
            username:usernamee
        }
    })
    if(answer?.id){
     const user:UserAl={id:answer.id,username:answer.username,email:answer.email,password:answer.password}
     return user
    }
    return false


   }catch(e:any){
       console.log(e.message)
       return false
    }
    
}