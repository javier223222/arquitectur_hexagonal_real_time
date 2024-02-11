import { SubastaResponseIn } from "../../controllers/types/InteracionResponse";
import { SubastaInteraction } from "../../controllers/types/SubastaInteraction";
import { WinnerResponse } from "../../controllers/types/WinnerResponse";
import { db } from "../repositories/myql.repo";



export const getAllPujas=async(idSuba:number):Promise<any[]>=>{
    try{
        const result=await db.ofertas.findMany({
            where:{
                idSubasta:idSuba,
            },
           
            orderBy:{
                createdAt:"desc"
            },
        })
        return result
    }catch(e:any){
        console.log(e.message)
        return []
    }
}


export const createOferta=async(subasta:SubastaInteraction):Promise<SubastaResponseIn>=>{
    try{
    const result=  await   db.ofertas.create({
            data:{
                idUser:subasta.idUser,
                idSubasta:subasta.idSubasta,
                updatedAt:subasta.updatedAt,
                precio:subasta.precio
            },
            select:{
                idUser:true,
                idSubasta:true,
                precio:true,
                updatedAt:true,
                createdAt:true,
                idOferta:true,
                user:{
                    select:{
                        username:true,
                    }
                }
            }
         })
         
        
         return {
            success:true,
            message:"Puja creada",
            iduser:result.idUser,
            username:result.user.username,
            precio:result.precio
         }
    }catch(e:any){
        console.log(e.message)
        return {
            success:false,
            message:"Error al crear la puja",
            iduser:0,
            username:"",
            precio:""
        }
    }

}

export const getWinner=async(idSuba:number):Promise<WinnerResponse>=>{
    try{
      const result=await db.winner.findFirst({
        where:{
            idSubasta:idSuba
        }
        ,
        select:{
          idUser:true,
          idSubasta:true,
          subasta:{
            select:{
                ofertas:{
                    where:{
                        idSubasta:idSuba
                    },
                    select:{
                        idUser:true,
                        precio:true,
                        user:{
                            select:{
                                username:true
                            }
                        }
                        
                    },
                    orderBy:{
                        createdAt:"desc"
                    }
                }
            }
          }
        }
      })
      return {
        username:result?.subasta.ofertas[0].user.username,
        idUser:result?.idUser,
        idSubasta:result?.idSubasta,
        precio:result?.subasta.ofertas[0].precio
      }

    }catch(e:any){
        console.log(e.message)
        return {
            idUser:0,
            idSubasta:0,
            username:"",
            precio:""
        }

    }
}

export const setWinner=async(idSuba:number,idUser:number):Promise<boolean>=>{
     try{
         await db.winner.create({
            data:{
                idUser:idUser,
                idSubasta:idSuba,
                updatedAt:new Date()
            }
         })

         return true
     }catch(e:any){
         console.log(e.message)
            return false
     }
}