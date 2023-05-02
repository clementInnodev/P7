import { Schema, model, Document, Types } from 'mongoose'

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    additionalAddress: {
        type: String,
        required: false
    },
    postcode: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    creationDate: {
        type: Schema.Types.Date,
        required: true,
        set: () => {
            const now = new Date()
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ')
            return formattedDate
        }
    },
    updateDate: {
        type: Schema.Types.Date,
        required: false
    }
},
{
    timestamps: false
})

export interface IUserModel extends Document {
    email: string
    password: string
    firstname: string
    lastname: string
    service: string
    address: string
    additionalAddress: string
    postcode: string
    town: string
    admin: boolean
    confirmed: boolean
    birthday: string
    gender: string
    phoneNumber: string
    creationDate: string
    updateDate?: string
}

export interface UserMongoose extends IUserModel {
    _id: Types.ObjectId;
}

export const UserModel = model<IUserModel>('User', userSchema)