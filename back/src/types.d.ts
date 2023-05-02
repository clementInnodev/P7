import 'express'
import { ID } from './core/interfaces/id';

declare module 'express' {
    export interface Request {
        userId?: ID;
        admin?: boolean
    }
}