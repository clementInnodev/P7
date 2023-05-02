import { NextFunction, Request, Response } from 'express'


import { CustomError } from '../utils/errors'

import { USER_USE_CASE } from '../core/types/use-case.types'
import { container } from '../utils/inversify.config'
import { GetUserByEmail } from '../core/use-cases/users/get-user-by-email.use-case'

export const isConfirm = async (req: Request<{}, {}, {email : string}>, res: Response, next: NextFunction) => {

    const email: string = req.body.email

    try {

        const user = await container.get<GetUserByEmail>(USER_USE_CASE.GetUserByEmail).execute(email)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `Aucun utilisateur trouvé !`, 404)
            throw error
        }
        
        if(!user.confirmed){
            const error: CustomError = new CustomError('Authorization Error', 'Vous n\'avez pas confirmé votre inscription, un email vous a été envoyé pour la confirmer', 401)
            throw error
        }

    } catch (error) {

        next(error)
    }

    next()
}