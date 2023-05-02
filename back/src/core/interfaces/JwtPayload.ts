import { JwtPayload } from "jsonwebtoken"
import { ID } from "./id"

export interface CustomJwtPayload extends JwtPayload{
    userId: ID
}