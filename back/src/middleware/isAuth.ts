import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { secretKey } from "../utils/secret-key";
import { CustomError } from '../utils/errors';


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        const error = new CustomError('Authorization Error', 'Utilisateur non autorisé !', 401)
        next(error)
    }else{
        const token: string = req.headers.authorization.split(' ')[1]

        try {
            const isValid = verify(token, secretKey) as JwtPayload;
        
            req.userId = isValid.userId
        } catch (err) {
            const error = new CustomError('Authorization Error', 'Utilisateur non autorisé !', 401)
            next(error)
        }
        next()
    }    
}