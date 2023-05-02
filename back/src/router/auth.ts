import { Router } from 'express'
import { body } from 'express-validator'

import { login, signup, resetPassword, confirmSignup, forgottenPassword, verifyUserLoged } from '../controller/auth'
import { User } from '../infrastructure/repositories/sequelize/user.model'

import { isConfirm } from '../middleware/isConfirm'

export const router = Router()

router.post('/signup',
    [
        body('email')
            .trim()
            .escape()
            .normalizeEmail()
            .isEmail().withMessage('n\'est pas une adresse email valide')
            .custom( async (value, {req}) => {
                const emailAlreadyUsed = await User.findOne({
                    where: {
                        email : value
                    }
                })
                if(emailAlreadyUsed){
                    throw new Error('est déjà utilisé')
                }
            }),
        body('password', 'n\'est pas un mot de passe valide (6 caractères, 1 majuscule, 1 chiffre, 1 symbole minimum')
            .trim()
            .escape()
            .isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1}),
        body('firstname')
            .trim()
            .escape()
            .isAlpha('fr-FR', {ignore: ' -'}).withMessage('n\'est pas un prénom valide')
            .isLength({min: 1, max: 30}).withMessage('n\'est pas un prénom valide (entre 1 et 30 caractères)'),
        body('lastname')
            .trim()
            .escape()
            .isAlpha('fr-FR', {ignore: ' -\''}).withMessage('n\'est pas un nom valide')
            .isLength({min: 1, max: 30}).withMessage('n\'est pas un nom valide (entre 1 et 30 caractères)'),
        body('service')
            .trim()
            .escape()
            .isLength({min: 1}).withMessage('Veuillez renseigner votre service')
            .custom((value, {req}) => {
                const services: string[] = ['Comptabilité', 'Ressources humaines', 'Développement', 'Commercial', 'Logistique', 'Direction']
                const match = services.includes(value)
                if(!match){
                    throw new Error('n\'est pas un service valide')
                }
                return true
            }),
        body('gender')
            .trim()
            .escape()
            .isIn(['Homme', 'Femme']).withMessage('n\'est pas une valeur valide'),
        body('phoneNumber')
            .trim()
            .escape()
            .isLength({min: 10, max: 10}).withMessage('n\'est pas un numéro de téléphone valide (10 caractères)')
            .isNumeric().withMessage('n\'est pas valide car ne doit contenir que des nombres'),
        body('address')
            .trim()
            .escape()
            .isAlphanumeric('fr-FR', {ignore: ' -\''}).withMessage('n\'est pas une adresse valide')
            .isLength({min: 1, max: 70}).withMessage('n\'est pas une adresse valide (entre 1 et 70 caractères)'),
        body('additionalAddress')
            .trim()
            .escape()
            .isLength({max: 70}).withMessage('n\'est pas un complément d\'adresse valide (70 caractères maximum)'),
        body('postcode')
            .trim()
            .escape()
            .isLength({min: 5, max: 5}).withMessage('n\'est pas un code postal valide (5 caractères)')
            .isNumeric().withMessage('n\'est pas valide car ne doit contenir que des nombres'),
        body('town')
            .trim()
            .escape()
            .isAlpha('fr-FR', {ignore: ' -\''}).withMessage('n\'est pas une ville valide')
            .isLength({max: 45, min: 1}).withMessage('n\'est pas une ville valide (entre 1 et 45 caractères)'),
        body('birthday')
            .trim()
            .escape()
            .isDate().withMessage('n\'est pas une date valide')
            .custom((value, {req}) => {
                const birthday = new Date(Date.parse(value))
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0,10);
                const dateObj = new Date(formattedDate);
                if(birthday === dateObj || birthday > dateObj){
                    throw new Error('n\'est pas une date d\'anniverssaire valide. Elle doit être antérieur à la date d\'aujourd\'hui')
                }
                return true
            })
    ],
    signup
)

router.post('/login', isConfirm,
    [
        body('email')
            .trim()
            .escape()
            .normalizeEmail()
            .isEmail().withMessage('Veuillez renseigner une adresse email valide'),
        body('password')
            .trim()
            .escape()
    ],
    login
)

router.get('/confirm-signup/:token', confirmSignup)

// email dans le body / enverra un lien par mail / mail contenant un lien avec un token qui lui même contiendra l'userId
router.post('/forgotten-password',
    body('email')
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail().withMessage('Veuillez renseigner une adresse email valide'),
    forgottenPassword
)

// double input password / vérifiera le match / mettra à jour en bdd
router.put('/reset-password',
    [
        body('password', 'Veuillez renseigner un mot de passe valide (6 caractères, 1 majuscule, 1 chiffre, 1 symbole minimum')
            .trim()
            .escape()
            .isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1}),
        body('confirmPassword')
            .trim()
            .escape()
            .custom( (value, {req}) => {
                console.log(req.body.confirmationPassword, req.body.password)
                if(req.body.confirmationPassword !== req.body.password){
                    throw new Error('doivent être identiques')
                    //throw new CustomError('Les mots de passe doivent être identique', 400)
                }
                return true
            })
    ],
    resetPassword 
)

router.get('/loged/:token', verifyUserLoged)