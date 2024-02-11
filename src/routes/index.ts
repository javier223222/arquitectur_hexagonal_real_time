import express,{Express} from "express"
import userRouter from "./AuthRouter"
import subastaServer from "./SubastRouter"

let mainRoutes:Express=express()
mainRoutes.use("/auth",userRouter)
mainRoutes.use("/subasta",subastaServer)



export default mainRoutes

