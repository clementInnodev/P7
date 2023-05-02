export interface UserModel {
    id?: number
    email: string
    firstname: string
    lastname: string
    address: string
    additionalAddress: string
    postcode: string
    town: string
    service: string
    birthday: string
    phoneNumber: string
    gender: string
    confirmed?: boolean
    admin?: boolean
    creationDate: string
    updateDate?: string
}

export interface UserCreationModel{
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
    phoneNumber: string
    gender: string
}

export interface UserUpdateModel{
    email: string
    firstname: string
    lastname: string
    address: string
    additionalAddress: string
    postcode: string
    town: string
    service: string
    birthday: string
    phoneNumber: string
    gender: string
    updateDate: string
}