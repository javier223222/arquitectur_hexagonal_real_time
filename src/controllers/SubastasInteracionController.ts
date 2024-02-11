import { createOferta, getAllPujas, getWinner, setWinner } from "../domain/orm/SubasInteraction.orm";
import { IPujas } from "./interfaces";
import { SubastaResponseIn } from "./types/InteracionResponse";
import { SubastaInteraction } from "./types/SubastaInteraction";
import { WinnerResponse } from "./types/WinnerResponse";

export class SubasInteractionController implements IPujas{
   public async getPujas(idSubasta: number): Promise<any[]> {
        const result=await getAllPujas(idSubasta)
        return result
    }
    public async addPuja(puja: SubastaInteraction): Promise<SubastaResponseIn> {
        try{
         const result:SubastaResponseIn=await createOferta(puja)
         return result
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
    public async gteWinner(idSubasta: number): Promise<WinnerResponse> {
        try{
           const result:WinnerResponse=await getWinner(idSubasta)
           return result
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
    public async setWinnerS(idSubasta: number, idUser: number): Promise<Boolean> {
        try{
            await setWinner(idSubasta,idUser)
            return true

        }catch(e:any){
            console.log(e.message)
            return false
        }
    }
}