import { NextFunction, Request, Response } from "express"
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import { secretKey } from "../utils/secret-key"

import { transporter } from "../utils/nodemailer"

import { CustomJwtPayload } from "../core/interfaces/JwtPayload"
import { CustomError } from "../utils/errors"

import { LoginBody, ResetPasswordBody, UserSignupBody } from "../core/interfaces/user"

import { CreateUser } from "../core/use-cases/users/create-user.use-case"
import { GetUserByEmail } from "../core/use-cases/users/get-user-by-email.use-case"
import { GetUserById } from "../core/use-cases/users/get-user-by-id.use-case"
import { ConfirmInscription } from "../core/use-cases/users/confirm-inscription.use-case"
import { UpdatePassword } from "../core/use-cases/users/update-password.use-case"

import { container } from "../utils/inversify.config"
import { USER_USE_CASE } from "../core/types/use-case.types"

export const signup = async (req: Request<{}, {}, UserSignupBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }

        const userData: UserSignupBody = {
            email: req.body.email,
            password: await hash(req.body.password, 12),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            service: req.body.service,
            additionalAddress: req.body.additionalAddress,
            address: req.body.address,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            postcode: req.body.postcode,
            town: req.body.town
        }

        const user = await container.get<CreateUser>(USER_USE_CASE.CreateUser).execute(userData)

        const token = sign({
            userId: user.id
        }, secretKey)

        transporter.sendMail({
            to: req.body.email,
            from: 'Groupomania@outlook.fr',
            subject: 'Pour confirmer votre inscription',
            html: `
            <a href="http://localhost:4200/auth/confirm/${token}">Veuillez cliquer sur le lien ci-dessous afin de confirmer votre inscription au réseau Groupomania</a>
            `
        }, (error, info) => {
            if(error){
                console.log('NodeMailer error', error)
            }else{
                console.log('NodeMailer info', info)
            }
        })
    
        res.status(201).json({
            message: `${req.body.firstname} ${req.body.lastname}, votre compte a été créé avec succès`,
            user
        })  
    } catch (error: any) {
        next(error)
    }
}


export const confirmSignup = async (req: Request<{token: string}>, res: Response, next: NextFunction) => {
    try {
        const token = verify(req.params.token, secretKey)
        if(!token){
            const error: CustomError = new CustomError('Authorization Error', 'Impossible de confirmer votre inscription, token invalide', 401)
            throw error
        }

        const userId = (token as CustomJwtPayload).userId

        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        if(user.confirmed){
            res.status(302).json({
                message: 'Votre inscription est déjà validée'
            })
        }else{
            const userConfirmed = await container.get<ConfirmInscription>(USER_USE_CASE.ConfirmationInscription).execute(user.id)
            if(!userConfirmed){
                const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
                throw error
            }

            transporter.sendMail({
                to: userConfirmed.email,
                from: 'Groupomania@outlook.fr',
                subject: 'Confirmation d\'inscription',
                html: `
                <h1>Confirmation d'inscription</h1>
                <p>Félicitation, votre inscription est confirmée !</p>
                <p>Vous avez maintenant accès au réseau de Groupomania</p>
                `
            }, (error, info) => {
                if(error){
                    console.log('NodeMailer error', error)
                }else{
                    console.log('NodeMailer info', info)
                }
            })
    
            res.status(200).json({
                message: `Inscription validée`,
                user: userConfirmed
            })
        }        
    } catch (error: any) {
        next(error)
    }
}


export const login = async (req: Request<{}, {}, LoginBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }
    
        const email: string = req.body.email
        const password: string = req.body.password

        const user = await container.get<GetUserByEmail>(USER_USE_CASE.GetUserByEmail).execute(email)
        if(!user){
            //Message d'erreur volontairement vague et ne donnant aucune information quand à la présence ou non d'un utilisateur inscrit avec cette adresse email
            const error: CustomError = new CustomError("Authorization Error", 'Paire email / mot de passe incorrecte', 401)
            throw error
        }

        const match: boolean = await compare(password, user.password)
        if(!match){
            const error: CustomError = new CustomError("Authorization Error", 'Paire email / mot de passe incorrecte', 401)
            throw error
        }

        const userId = user.id.toString()
        const token = sign({
            userId
        }, secretKey, {
            expiresIn: '1h'
        })

        res.status(200).json({
            message: `${user.firstname} ${user.lastname} connecté avec succès`,
            token,
            user
        })
    } catch (error: any) {
        next(error)
    }
}


export const forgottenPassword = async (req: Request<{}, {}, {email: string}>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }

        const email: string = req.body.email

        const user = await container.get<GetUserByEmail>(USER_USE_CASE.GetUserByEmail).execute(email)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'email ${email} n'existe pas`, 404)
            throw error
        }

        const token = sign({
            userId: user.id
        }, secretKey, {
            expiresIn: '1h'
        })

        transporter.sendMail({
            to: user.email,
            from: 'Groupomania@outlook.fr',
            subject: 'Mot de passe oublié',
            html: `
            <a href="http://localhost:4200/auth/reset-password/${token}">Veuillez cliquer sur le lien ci-dessous pour modifier votre mot de passe</a>
            `
        }, (error, info) => {
            if(error){
                console.log('NodeMailer error', error)
            }else{
                console.log('NodeMailer info', info)
            }
        })

        res.status(200).json({
            message: `Email de modification de mot de passe envoyé avec succès à l'adresse mail ${user.email}`
        })
    } catch (error: any) {
        next(error)
    }
}


export const resetPassword = async (req: Request<{}, {}, ResetPasswordBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array()
            )
            throw error
        }

        const token = verify(req.body.token, secretKey)
        if(!token){
            const error: CustomError = new CustomError('Authorization Error', 'Impossible de modifier votre mot de passe, token invalide', 401)
            throw error
        }

        const userId = (token as CustomJwtPayload).userId

        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        const newPassword = await hash(req.body.password, 12)

        await container.get<UpdatePassword>(USER_USE_CASE.UpdatePassword).execute(userId, newPassword)

        res.status(200).json({
            message: 'Mot de passe modifié avec succès'
        })
    } catch (error: any) {
        next(error)
    }
}


export const verifyUserLoged = (req: Request<{token: string}>, res: Response, next: NextFunction) => {
    const token = req.params.token
    let message: string
    try {
        verify(token, secretKey)
        message = 'Token valide'
        res.status(200).json({message})
    } catch (error) {
        message = 'Token invalide'
        res.status(401).json({message})
    }
}