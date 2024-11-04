import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { ApiError } from "../utils/ApiError";

export function validateRequestBody(zodSchema: ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = zodSchema.safeParse(req.body);

        if(!result.success) {
            return next(ApiError.badRequest(result.error));
        }

        return next();
    }
}

export function validateRequestHeader(zodSchema: ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = zodSchema.safeParse(req.headers);

        if(!result.success) {
            return next(ApiError.badRequest(result.error));
        }

        return next();
    }
}