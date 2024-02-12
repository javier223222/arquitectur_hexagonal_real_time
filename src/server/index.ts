import express, {Express, json,Request,Response} from "express";
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import mainRoutes from "../routes";
import fileUpload from "express-fileupload";
import {Server} from "socket.io"
import { SubasInteractionController } from "../controllers/SubastasInteracionController";
import { getToekndata } from "../utils/jwt";
import { SubastaResponseIn } from "../controllers/types/InteracionResponse";
import { SubastaController } from "../controllers/SubastaController";
import { WinnerResponse } from "../controllers/types/WinnerResponse";
import { CreateUserRespose } from "../controllers/types/AuthResponse";
import { verify } from "../middlewares/socket";
dotenv.config()
const app:Express=express()
const serverHttp=http.createServer(app)


const PORT=process.env.PORT || 81

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads",
}))
app.get("/",(req:Request,res:Response)=>{
   res.status(200).send(`<h1>Bienvenido a mi aplicacion de tiempo real con socket.io,longpolling</h1>`)

})
app.use("/api",mainRoutes)

const io=new Server(serverHttp,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.use(verify)
io.of("/subastas")
.on("connection",(socket)=>{
    socket.on("historial_Of",async(data)=>{
     const subasta:SubastaController=new SubastaController()
     const result:CreateUserRespose=await subasta.getFinishedSubasta()
      io.of("/subastas").emit("all_end_sub",result)
    })

    socket.on("join-room",async(data)=>{
        const {room,token}=data
        console.log(room)
        const {id,username}=await getToekndata(token)
        socket.join(room)
        const subas:SubasInteractionController=new SubasInteractionController()
        const result=await subas.getPujas(parseInt(room))
        const general:SubastaController=new SubastaController()
        const subabyId=await general.getSubasta(parseInt(room))
        console.log(subabyId)
        if(subabyId.result.isFinished){
            io.of("/subastas").to(room).emit("end-subasta",subabyId.result.isFinished)
            const resultWin:WinnerResponse=await subas.gteWinner(parseInt(room))
            console.log(resultWin)
            io.of("/subastas").to(room).emit("winner",resultWin)
        }else{
            io.of("/subastas").to(room).emit("end-subasta",subabyId.result.isFinished)
        }
        const isAdmin:CreateUserRespose=await general.getByCreator(parseInt(room),id)
    
        io.of("/subastas").to(room).emit("info-subasta",subabyId.result)
       io.of("/subastas").to(room).emit("get-pujas",result)
    })

    socket.on("finish_subasta",async(data)=>{
        const {room,token,idUser}=data
        const {id,username}=await getToekndata(token)
        const subas:SubastaController=new SubastaController()
        const subesInteraction:SubasInteractionController=new SubasInteractionController()
        const isAdmin:CreateUserRespose=await subas.getByCreator(parseInt(room),id)
        if(isAdmin.result){
            console.log("ss")
          await subesInteraction.setWinnerS(parseInt(room),parseInt(idUser))
          await subas.updateSubasta({idsubast:parseInt(room),namesubasta:"",imagesubasta:"",descripcion:"",
           finisAt:new Date(),isFinished:true,
           idcreator:id,timeduration:new Date()},id,parseInt(room),"isfinished")
              
                const resultWin:WinnerResponse=await subesInteraction.gteWinner(parseInt(room))
                const subabyId=await subas.getSubasta(parseInt(room))
                io.of("/subastas").to(room).emit("winner",resultWin)
                io.of("/subastas").to(room).emit("end-subasta",subabyId.result.isFinished)
                const historial:CreateUserRespose=await subas.getFinishedSubasta()
                io.of("/subastas").emit("all_end_sub",historial)

          
        }else{
            io.of("/subastas").to(room).emit("error","No eres el creador de la subasta")
        }
        

    })

    socket.on("add_puja",async(data)=>{
        const {room,token,precio}=data
        const {id,username}=await getToekndata(token)
        const subas:SubasInteractionController=new SubasInteractionController()
        
        const all:any[]=await subas.getPujas(parseInt(room))
        if(all.length==0){
            const result:SubastaResponseIn=await subas.addPuja({idUser:id,idSubasta:parseInt(room),precio:precio,updatedAt:new Date()})
            const resulttwo=await subas.getPujas(parseInt(room))
            io.of("/subastas").to(room).emit("get-pujas",resulttwo)
            io.of("/subastas").to(room).emit("new-price",result)
        }else if(parseInt(all[0].precio)<parseInt(precio)){
            const result:SubastaResponseIn=await subas.addPuja({idUser:id,idSubasta:parseInt(room),precio:precio,updatedAt:new Date()})
            const resulttwo=await subas.getPujas(parseInt(room))
          console.log(resulttwo)
            io.of("/subastas").to(room).emit("get-pujas",resulttwo)
            io.of("/subastas").to(room).emit("new-price",result)
        }else{
            io.of("/subastas").to(room).emit("error","El precio debe ser mayor al actual")
        }
        
    })

    
})


export default serverHttp