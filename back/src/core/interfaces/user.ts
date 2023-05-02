import { ID } from "./id";

export interface User {
    id: ID
    email: string
    password: string
    firstname: string
    lastname: string
    address: string
    additionalAddress?: string
    postcode: string
    town: string
    service: string
    birthday: string
    gender: string
    phoneNumber: string
    confirmed?: boolean
    admin?: boolean
    creationDate: string
    updateDate?: string
}

export interface UserSignupBody {
    email: string
    password: string
    firstname: string
    lastname: string
    address: string
    additionalAddress: string
    postcode: string
    town: string
    service: string
    birthday: string
    gender: string
    phoneNumber: string
}

export interface UserUpdateBody {
    email: string
    firstname: string
    lastname: string
    address: string
    additionalAddress: string
    postcode: string
    town: string
    service: string
    birthday: string
    gender: string
    phoneNumber: string
}

export interface LoginBody {
    email: string
    password: string
}

export interface ResetPasswordBody{
    password: string
    token : string
}