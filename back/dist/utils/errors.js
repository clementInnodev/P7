"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(name, message, statusCode, validationErrors) {
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}
exports.CustomError = CustomError;
/* export class CustomValidationError{
    constructor(public message: string, public statusCode: number, public validationErrors: ValidationError[]) {
        message = 'validation error'
    }
} */ 
