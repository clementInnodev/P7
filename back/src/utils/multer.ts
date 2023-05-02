import { Request } from "express";
import multer from "multer";
import { CustomError } from "./errors";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(new CustomError('Validation Error', 'Le fichier n\'est pas une image valide', 400))
    }
}

const MIME_TYPES: { [key:string]: string } = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        const nameWithExtension = file.originalname.split(' ').join('-');
        const name = nameWithExtension.split('.')[0]
        const extention = MIME_TYPES[file.mimetype]
        const uniqueDate = Date.now()
        const newFileName = `${name}_${uniqueDate}.${extention}`
        const decodedFileName = decodeURIComponent(newFileName)
        cb(null, decodedFileName)
    }
});
