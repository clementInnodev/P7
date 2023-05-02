interface CustomError {
    name: string,
    message: string,
    statusCode: number,
    validationErrors?: string[]
}

export interface ResponseError {
    error: CustomError
    [key: string]: any
}