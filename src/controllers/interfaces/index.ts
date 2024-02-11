import { CreateUserRespose } from "../types/AuthResponse";
import { SubastaResponseIn } from "../types/InteracionResponse";
import { SubastaInteraction } from "../types/SubastaInteraction";
import { Subasta } from "../types/SubastaResponse";
import { UserAl } from "../types/User.repo";
import { WinnerResponse } from "../types/WinnerResponse";

export interface IAuthController{
    createUser(user:UserAl):Promise<CreateUserRespose>,
    loginUser(user:UserAl):Promise<CreateUserRespose>
}

export interface ISubasta{
  creatSubasta(subasta:Subasta,file:any):Promise<CreateUserRespose>
  getSubasta(id?:number):Promise<CreateUserRespose>
  updateSubasta(subasta:Subasta,idUser:number,idSubasta:number,type:string):Promise<CreateUserRespose>
  getByCreator(idSubast:number,idUser:number):Promise<CreateUserRespose>
  getMyownSubasta(idUser:number):Promise<CreateUserRespose>
  getFinishedSubasta():Promise<CreateUserRespose>
}

export interface IPujas{
  getPujas(idSubasta:number):Promise<any[]>
  addPuja(puja:SubastaInteraction):Promise<SubastaResponseIn>
  gteWinner(idSubasta:number):Promise<WinnerResponse>
  setWinnerS(idSubasta:number,idUser:number):Promise<Boolean>
}