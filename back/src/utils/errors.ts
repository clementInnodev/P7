import { ValidationError } from 'express-validator'

type errorsMessage = 'Validation Error' | 'Authorization Error' | 'Server Error' | 'Not Found Error'

export class CustomError{
    constructor(public name: errorsMessage, public message: string, public statusCode: number, public validationErrors?: ValidationError[]) {}
}

/* export class CustomValidationError{
    constructor(public message: string, public statusCode: number, public validationErrors: ValidationError[]) {
        message = 'validation error'
    }
} */