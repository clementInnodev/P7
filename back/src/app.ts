import 'reflect-metadata'
import express, { NextFunction, Request, Response, Express } from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'

import { CustomError } from './utils/errors'

import { router as postRouter } from './router/posts'
import { router as authRouter } from './router/auth'
import { router as userRouter } from './router/user'
import { container } from './utils/inversify.config'
import { Database } from './infrastructure/db/database'
import { DATABASE } from './core/types/db.types'

import { storage, fileFilter } from './utils/multer'
import path from 'path'

const app: Express = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


app.use(multer({storage, fileFilter}).single('image'))
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, '../images')))

app.use('/auth', authRouter)
app.use(postRouter)
app.use(userRouter)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.use((err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    let error: CustomError
    if(err instanceof Error){
        error = new CustomError('Server Error', err.message, 500)
    }else {
        error = err
    }
    console.log(err)
    return res.status(error.statusCode).json({...error})
});


const database = container.get<Database>(DATABASE)
database.connect(app);