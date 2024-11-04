import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function apiErrorHandler(err: any | ApiError, req: Request, res: Response, next: NextFunction) {
    
    if (err instanceof ApiError) {
        return res.status(err.code).send({message: err.message});
    }

    return res.status(500).send({message: 'Something went wrong.'});
}