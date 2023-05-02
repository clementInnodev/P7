import { Server as socketServer } from 'socket.io';
import { Server as httpServer } from 'http';

let io: socketServer

export const init = (server: httpServer)  => {
    io = new socketServer(server, {
        cors: {
          origin: "http://localhost:4000",
          methods: ["GET", "POST"]
        }
    })
}

export const getIO = () => {
    if(!io){
        throw new Error('Socket.io n\'est pas initialisé')
    }
    return io
}