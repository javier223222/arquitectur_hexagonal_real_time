import fs from "fs-extra"


export const  deletefile=async(path:any)=>{
    await fs.unlink(path.tempFilePath)
}

