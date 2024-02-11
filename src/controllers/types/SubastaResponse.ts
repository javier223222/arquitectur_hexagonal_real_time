export type Subasta={
    idsubast:number,
    namesubasta:string,
    imagesubasta:string,
    descripcion:string,
    idcreator:number,
    created_at?:Date,
    updated_at?:Date,
    timeduration:Date,
    finisAt:Date,
    isFinished:boolean,
}