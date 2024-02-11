import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

export const uploadImage=async(filepath:any):Promise<any>=>{
    return await cloudinary.uploader.upload(filepath.tempFilePath,{
        folder:"connection"
    })
}

export const deleteImage=async(public_id:string):Promise<any>=>{
    return await cloudinary.uploader.destroy(public_id)
}