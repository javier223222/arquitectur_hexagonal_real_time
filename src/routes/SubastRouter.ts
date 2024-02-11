import express,{Request,Response} from "express"
import { verifyToken } from "../middlewares/httpMidleware"
import { getToekndata } from "../utils/jwt"
import { Subasta } from "../controllers/types/SubastaResponse"
import fileUpload, { UploadedFile } from "express-fileupload"
import { uploadImage } from "../utils/cloudinary"
import { SubastaController } from "../controllers/SubastaController"
import { CreateUserRespose } from "../controllers/types/AuthResponse"
let  responseClients:Response[]=[]
const answerNewSubasta=async()=>{
  console.log("nueva subasta")
  const subastaCreated:SubastaController=new SubastaController()
  const result:CreateUserRespose=await subastaCreated.getSubasta()
  for(let res of responseClients){
    console.log("enviando respuesta")
    res.status(result.status).json(result)
  }

   responseClients=[]
}

let subastaServer=express.Router()

subastaServer.
             route("/")
             .post(verifyToken,async(req:Request,res:Response)=>{
                if(req.files?.image){
                    console.log(req.files.image)
                    console.log(req.headers["x-access-token"] as string)
                    const token=await getToekndata(req.headers["x-access-token"] as string)
                    const {id}=token
                    const {nameSubast,descripcion,updatedAt,timeDurantion,finidAt}=req.body
                    // const filesdi:any=req.files.image as fileUpload.UploadedFile
                    const image=req.files.image
                    const subasta:Subasta={idsubast:0,namesubasta:nameSubast,descripcion:descripcion,updated_at:new Date(updatedAt),timeduration:new Date(timeDurantion),imagesubasta:""
                    ,idcreator:id,finisAt:new Date(finidAt),isFinished:false}
                    const subastaCreated:SubastaController=new SubastaController()
                    const result:CreateUserRespose=await subastaCreated.creatSubasta(subasta,image)
                  await answerNewSubasta()
                    return res.status(result.status).json(result)
                    
                }

              return res.status(400).json({message:"no se encontro imagen"})
             })
             .get(verifyToken,async(req:Request,res:Response)=>{

                const subastaCreated:SubastaController=new SubastaController()
                const {id}=req.query
                if(id){
                    const result:CreateUserRespose=await subastaCreated.getSubasta(parseInt(id as string))
                    console.log(id)
                    return res.status(result.status).json(result)
                }
                const result:CreateUserRespose=await subastaCreated.getSubasta()
             return  res.status(result.status).json(result)
             }).patch(verifyToken,async(req:Request,res:Response)=>{
                const {idSubasta,type,nameSubast,descripcion}=req.body
                const {id}=await getToekndata(req.headers["x-access-token"] as string)
                const subastaCreated:SubastaController=new SubastaController()
                const subast:Subasta={
                  idsubast:idSubasta,
                  idcreator:id,
                  namesubasta:nameSubast?nameSubast:"",
                  descripcion:descripcion?descripcion:"",
                  updated_at:new Date(),
                  timeduration:new Date(),
                  imagesubasta:"",
                  finisAt:new Date(),
                  isFinished:false
                }
                const result:CreateUserRespose=await subastaCreated.updateSubasta(subast,id,idSubasta,type)
                return res.status(result.status).json(result)
                
             })
subastaServer
            .route("/nuevas_Subastas")
            .get(verifyToken,(req:Request,res:Response)=>{
              responseClients.push(res);

               req.on('close', () => {
                 const index = responseClients.length-1; 
                 responseClients = responseClients.slice(index, 1);
              });
 
           
            }) 
subastaServer
            .route("/myOwmSubastas")
            .get(verifyToken,async(req:Request,res:Response)=>{
              const {id}=await getToekndata(req.headers["x-access-token"] as string)
              const subastaCreated:SubastaController=new SubastaController()
              const result:CreateUserRespose=await subastaCreated.getMyownSubasta(id)
              return res.status(result.status).json(result)
            })            

export default subastaServer