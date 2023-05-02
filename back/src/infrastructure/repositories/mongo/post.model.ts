import { Schema, model, Document } from 'mongoose'

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

export interface IPostModel extends Document {
    title: string
    content: string
    imageUrl: string
    UserId: string
    creationDate: string
    updateDate?: string
}

export const PostModel = model<IPostModel>('Post', postSchema)