import { ZodError } from "zod";

export class ApiError {
    
    code: number;
    message: string | ZodError;

    constructor(code: number, message: string | ZodError) {
        this.code = code;
        this.message = message;
    }

    static badRequest(message: ZodError) {
        return new ApiError(400, message);
    }

    static notFound(name: string) {
        return new ApiError(404, `${name} not found.`);
    }
}