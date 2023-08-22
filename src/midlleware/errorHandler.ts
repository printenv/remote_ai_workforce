import {Request, Response, NextFunction} from 'express'

const errorHandler = (
    err:any,
    req:Request,
    res:Response,
    next: NextFunction
) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    return res.status(errStatus).json({
        message: errMessage,
        stack: err.stack
    })
}

export default errorHandler