import { Server } from "http"
import { Sequelize } from "sequelize"
import { Express } from 'express'

import { init, getIO } from "../../utils/socket"


export const sequelize = new Sequelize('p7', 'root', 'root', {
    dialect: 'mysql',
    host: '127.0.0.1'
})


export const sequelizeInit = (app: Express) => {
    sequelize.sync({ force: false })
    .then( _ => {
        console.log('Connected to database')
        const server: Server = app.listen(3000)
        init(server)

        const io = getIO()

        io.on('connection', (socket: any) => {
            console.log('Client connected')

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    })
    .catch(err => console.error(err))
}