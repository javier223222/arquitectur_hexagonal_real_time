import express,{Request,Response} from "express"
import bodyParser from "body-parser"
import { CreateUserRespose } from "../controllers/types/AuthResponse"
import { AuthController } from "../controllers/AuthController"
import { UserAl } from "../controllers/types/User.repo"
import bcrypt from "bcrypt"
let jsonParse=bodyParser.json()
let userRouter=express.Router()
userRouter 
          .route("/")
          .post(async (req:Request,res:Response)=>{
               const authController:AuthController=new AuthController()
               const {username,email,password}=req.body
               const hashPaasword=bcrypt.hashSync(password,10)
               const user:UserAl={id:0,username:username,email:email,password:hashPaasword}
               const answer:CreateUserRespose=await authController.createUser(user)
                return  res.status(answer.status).json(answer) 
          })
userRouter.route("/login")
           .post(async(req:Request,res:Response)=>{
            const authController:AuthController=new AuthController()
            const {username,password}=req.body
            const user:UserAl={id:0,username:username,email:"",password:password}
            const answer:CreateUserRespose=await authController.loginUser(user)
            return res.status(answer.status).json(answer)
           })                

export default userRouter