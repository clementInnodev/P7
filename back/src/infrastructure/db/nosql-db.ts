import { Server } from 'http'
import mongoose from 'mongoose'
import { Express } from 'express'

import { init } from '../../utils/socket'

export const mongooseInit = (app: Express) => {
    mongoose.connect('mongodb+srv://test:test@projet7.3elrsct.mongodb.net/chat?retryWrites=true&w=majority')
    .then( _ => {
        console.log('Connected to database')
        const server: Server = app.listen(3000)
        const io: any = init(server)

        io.on('connection', (socket: any) => {
            console.log('Client connected')

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    })
    .catch(error => console.log(error))
}
