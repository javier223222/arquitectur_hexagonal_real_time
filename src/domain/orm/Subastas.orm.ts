import { Subasta } from "../../controllers/types/SubastaResponse";
import { db } from "../repositories/myql.repo";

export const addNewSubasta=async(subasta:Subasta):Promise<boolean>=>{
    try{
        await db.subasta.create({
            data:{
                nameSubata:subasta.namesubasta,
                imageSubasta:subasta.imagesubasta,
                descripcion:subasta.descripcion,
                idCreator:subasta.idcreator,
                updatedAt:subasta.updated_at,
                timeDurantion:subasta.timeduration,
                
            }
        })
        return true
    }catch(e:any){
        console.log(e.message)
        return false
    }
}

export const getNewsSubasta=async():Promise<any[]|boolean>=>{
    try{
        const subasta=await db.subasta.findMany({
            where:{
               isfinished:false
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return subasta

    }catch(e:any){
        console.log(e.message)
        return false
    }
}

export const getSubastaById=async(idsubasta:number):Promise<Subasta|boolean>=>{
     try{
        const subasta=await db.subasta.findUnique({
            where:{
                idSubasta:idsubasta
            }
        })

        if(subasta){
            const subast:Subasta={idsubast:subasta.idSubasta,namesubasta:subasta.nameSubata,descripcion:subasta.descripcion,updated_at:subasta.updatedAt,timeduration:subasta.timeDurantion?new Date(subasta.timeDurantion):new Date(),imagesubasta:subasta.imageSubasta,idcreator:subasta.idCreator,finisAt:subasta.finisAt?new Date(subasta.finisAt):new Date()
                ,isFinished:subasta.isfinished}
            return subast
        }
        return false
     }catch(e:any){
        console.log(e.message)
        return false
     }
}

export const updateSubasta=async(subasta:Subasta,type:string):Promise<boolean>=>{
    try{
        switch(type){
            case "name":
                await db.subasta.update({
                    where:{
                        idSubasta:subasta.idsubast
                    },
                    data:{
                        nameSubata:subasta.namesubasta
                    }
                })
                return true
                break
               case "descripcion":
                await db.subasta.update({
                    where:{
                        idSubasta:subasta.idsubast
                    },
                    data:{
                        descripcion:subasta.descripcion
                    }}
                    )
                    return true

                 break
               case "image":
                await db.subasta.update({
                    where:{
                        idSubasta:subasta.idsubast
                    },
                    data:{
                        imageSubasta:subasta.imagesubasta
                    }
                })
                return true
              case "isfinished":
                  await db.subasta.update({
                    where:{
                        idSubasta:subasta.idsubast,
                        
                    },
                    data:{
                        isfinished:subasta.isFinished,
                        finisAt:new Date()
                    }
                  })
                  return true
                break;
                default:
                    return false
                    break   
        }
        return false
    }catch(e:any){
        console.log(e.message)
        return false
    }
}

export const isAcreator=async(idsubasta:number,idUser:number):Promise<boolean>=>{
    try{
       const res=await db.subasta.findUnique({
           where:{
            idSubasta:idsubasta,
            idCreator:idUser
           }
       })

       if(res){
           return true
       }
       return false
    }catch(e:any){
        console.log(e.message)
        return false

    }
}

export const finishSubasta=async(idsubasta:number):Promise<boolean>=>{
    try{
        await db.subasta.update({
            where:{
                idSubasta:idsubasta
            },
            data:{
                isfinished:true,
                finisAt:new Date()
            }
        })
        return true
    }catch(e:any){
        console.log(e.message)
        return false
    }
}

export const getSubastaByCreator=async(idUser:number):Promise<any[]|boolean>=>{
    try{
        const subasta=await db.subasta.findMany({
            where:{
                idCreator:idUser
            }
        })
        return subasta
    }catch(e:any){
        console.log(e.message)
        return false
    }
}

export const getBycreatorOfSu=async(idSubast:number,idUser:number):Promise<boolean>=>{
    try{
        const res=await db.subasta.findUnique({
            where:{
                idSubasta:idSubast,
                idCreator:idUser
            }
        })
        if(res){
            return true
        }else{
            return false
        }

    }catch(e:any){
      console.log(e.message)
      return false    
    }
}


export const getFinishedSubasta=async():Promise<any[]|boolean>=>{
    try{
        const subasta=await db.subasta.findMany({
            where:{
                isfinished:true
            }
        })
        return subasta
    }catch(e:any){
        console.log(e.message)
        return false
    }
}