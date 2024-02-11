import { addNewSubasta, getBycreatorOfSu, getFinishedSubasta, getNewsSubasta, getSubastaByCreator, getSubastaById, isAcreator, updateSubasta } from "../domain/orm/Subastas.orm";
import { uploadImage } from "../utils/cloudinary";
import { deletefile } from "../utils/fsLink";
import { ISubasta } from "./interfaces";
import { CreateUserRespose } from "./types/AuthResponse";
import { Subasta } from "./types/SubastaResponse";

export class SubastaController implements ISubasta{
    public async creatSubasta(subasta: Subasta,file:any): Promise<CreateUserRespose> {
        try{
            console.log(file.tempFilePath)
           const image=await uploadImage(file)
           console.log(image)
          await deletefile(file)
          subasta.imagesubasta=image.secure_url
          const istru:boolean= await addNewSubasta(subasta)
          if(!istru){
            const result:CreateUserRespose={success:false,message:"Error creating subasta",error:"no se ",status:500}
            return result
          }
           const result:CreateUserRespose={success:true,message:"Subasta created",status:201}
           return result
        }catch(e:any){
           console.log(e.message)
              const result:CreateUserRespose={success:false,message:"Error creating subasta",error:e.message,status:500}
                return result
        }
    }
  public async getSubasta(id?:number): Promise<CreateUserRespose> {
        try{

          if(id){
            const subataByida=await getSubastaById(id)
            if(!subataByida){
                const result:CreateUserRespose={success:false,message:"Error getting subasta",error:"no se ",status:500}
                return result
            }
            const result:CreateUserRespose={success:true,message:"Subasta ",status:200,result:subataByida}
            return result
          }
            const subasta=await getNewsSubasta()
            if(!subasta){
                const result:CreateUserRespose={success:false,message:"Error getting subasta",error:"no se ",status:500}
                return result
            }
            

            const result:CreateUserRespose={success:true,message:"Subasta got succesfully",status:200,result:subasta}
            return result
        }catch(e:any){
          console.log(e.message)
          const result:CreateUserRespose={success:false,message:"Error creating subasta",error:e.message,status:500}
          return result
        }
    }

 public async updateSubasta(subasta: Subasta, idUser: number,idSubasta:number,type:string): Promise<CreateUserRespose> {

  try{
    const istru:boolean= await isAcreator(idSubasta,idUser)
    if(!istru){
      const result:CreateUserRespose={success:false,message:"Error updating subasta",error:"no eres el creador ",status:401}
      return result
    }
    const update=await updateSubasta(subasta,type)
    if(!update){
      const result:CreateUserRespose={success:false,message:"Error updating subasta",error:"no se ",status:500}
      return result
    }

    const result:CreateUserRespose={success:true,message:"Subasta updated",status:201}
    return result
  }catch(e:any){
    console.log(e.message)
    const result:CreateUserRespose={success:false,message:"Error updating subasta",error:e.message,status:500}
    return result
  }
 }  
 
 public async getByCreator(idSubast:number,idUser: number): Promise<CreateUserRespose> {
     try{
      const subasta=await getBycreatorOfSu(idSubast,idUser)
      if(!subasta){
          const result:CreateUserRespose={success:false,message:"Error getting subasta",error:"no se ",status:500}
          return result
      }
      const result:CreateUserRespose={success:true,message:"Subasta got succesfully",status:200,result:subasta}
      return result

     }catch(e:any){
        console.log(e.message)
        const result:CreateUserRespose={success:false,message:"Error getting subasta",error:e.message,status:500}
        return result
     }
 }
 public async getMyownSubasta(idUser: number): Promise<CreateUserRespose> {
     try{
      const subasta=await getSubastaByCreator(idUser)
      if(!subasta){
          const result:CreateUserRespose={success:false,message:"Error getting subasta",error:"no se ",status:500}
          return result
      }
      const result:CreateUserRespose={success:true,message:"Subasta got succesfully",status:200,result:subasta}
      return result

     }catch(e:any){
        console.log(e.message)
        const result:CreateUserRespose={success:false,message:"Error getting subasta",error:e.message,status:500}
        return result
     }
 }
 public async getFinishedSubasta(): Promise<CreateUserRespose> {
     try{
       const subasta:any[]|boolean=await getFinishedSubasta()
       return {
        success:true,
        message:"Subasta got succesfully",
        status:200,
        result:subasta
       }
       
     }catch(e:any){
      console.log(e.message)
      return {
     success:false,
      message:"Error getting subasta",
      error:e.message,
      status:500
      }
     }
 }
}


