import { Express } from "express";

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

import { CustomError } from "../utils/errors"

import { GetUsers } from "../core/use-cases/users/get-users.use-case";
import { GetUserById } from "../core/use-cases/users/get-user-by-id.use-case";
import { UpdateUser } from "../core/use-cases/users/update-user.use-case";
import { DeleteUser } from "../core/use-cases/users/delete-user.use-case";
import { UpdatePassword } from "../core/use-cases/users/update-password.use-case";
import { CreateFakeUsers } from "../core/use-cases/users/create-fake-users.use-case";

import { USER_USE_CASE } from "../core/types/use-case.types";
import { container } from "../utils/inversify.config";

import { ID } from "../core/interfaces/id";

import { hash } from "bcrypt";
import { Pagination } from "../core/interfaces/pagination";
import { UserUpdateBody } from "../core/interfaces/user";

export const getUsersWithFiltres = async (req: Request<{}, {}, {}, Pagination>, res: Response, next: NextFunction) => {
    try {
        const USERS_PER_PAGE = req.query.limit_per_page || req.query.limit_per_page !== undefined ? +req.query.limit_per_page : 0
        const page = req.query.page || req.query.page !== undefined ? +req.query.page : 0
        const skip = USERS_PER_PAGE !== 0 && page !== 0 ? (page - 1) * USERS_PER_PAGE : 0

        const users = await container.get<GetUsers>(USER_USE_CASE.GetUsers).execute(USERS_PER_PAGE, skip)
        if(!users){
            const error: CustomError = new CustomError('Not Found Error', 'Aucun utilisateur trouvé', 404)
            next(error)
        }

        res.status(200).json({
            message: 'Users récupérés avec succès',
            users
        })
    } catch (error: any) {
        next(error)
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: ID = req.userId!
    try {
        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        res.status(200).json({
            message: 'User récupéré avec succès',
            user
        })
    } catch (error: any) {
        next(error)
    }
}

export const getUserById = async (req: Request<{userId: string}>, res: Response, next: NextFunction) => {
    try {
        const userId: ID = req.params.userId
        const user = await container.get<GetUserById>(USER_USE_CASE.GetUserById).execute(userId)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `L'utilisateur avec l'id ${userId} n'existe pas`, 404)
            throw error
        }

        res.status(200).json({
            message: 'User récupéré avec succès',
            user
        })
    } catch (error: any) {
        next(error)
    }
}

export const updateUser = async (req: Request<{}, {}, UserUpdateBody>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array() 
            )
            throw error
        }


        const userId: ID = req.userId!

        const userData: UserUpdateBody = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            additionalAddress: req.body.additionalAddress,
            postcode: req.body.postcode,
            town: req.body.town,
            service: req.body.service,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber
        }

        const userUpdated = await container.get<UpdateUser>(USER_USE_CASE.UpdateUser).execute(userId, userData)
        if(!userUpdated){
            const error: CustomError = new CustomError('Not Found Error', `Aucun utilisateur avec l'id ${userId} trouvé!`, 404)
            throw error
        }

        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès',
            userUpdated
        })
    } catch (error: any) {
        next(error)
    }

}

export const updatePassword = async  (req: Request<{}, {}, {password: string}>, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty){
            console.log(errors.array())
            const error: CustomError = new CustomError(
                'Validation Error',
                'Erreur de validation, les données renseignées ne sont pas correctes!',
                400,
                errors.array() 
            )
            throw error
        }

        const userId: ID = req.userId!
        const password = await hash(req.body.password, 12)

        const user = await container.get<UpdatePassword>(USER_USE_CASE.UpdatePassword).execute(userId, password)
        if(!user){
            const error: CustomError = new CustomError('Not Found Error', `Aucun utilisateur avec l'id ${userId} trouvé!`, 404)
            throw error
        }
        
        res.status(200).json({
            message: "Mot de passe mis à jour avec succès"
        })        
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request<{userId: string}>, res: Response, next: NextFunction) => {
    try {
        const reqUserId: ID = req.userId!
        const paramsUserId: ID = req.params.userId

        if(+reqUserId !== +paramsUserId){
            const error: CustomError = new CustomError('Authorization Error', 'Vous n\'êtes pas autorisé à modifier cet utilisateur', 401)
            throw error
        }

        await container.get<DeleteUser>(USER_USE_CASE.DeleteUser).execute(reqUserId)

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        })
    } catch (error: any) {
        next(error)
    }
}

export const createFakeUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await container.get<CreateFakeUsers>(USER_USE_CASE.CreateFakeUsers).execute()
        res.status(200).json({
            message: "Les utilisateurs de test ont été créés avec succès !"
        })
    } catch (error: any) {
        next(error)
    }
}