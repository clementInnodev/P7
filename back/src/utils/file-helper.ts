import fs from 'fs'
import { CustomError } from './errors'

export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if(err){
            const error = new CustomError("Server Error", "Erreur lors de la tentative de suppression du fichier " + filePath, 500)
            throw error
        }
    })
}   