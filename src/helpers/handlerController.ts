import { Response } from "express";

export class HandleError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleServiceError = (error: unknown, res: Response) => {
    if (error instanceof HandleError) {
        res.status(error.statusCode).json({
            error: true,
            message: error.message
        });
    } else {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
};

export const handleSuccessful = (code: number, res: Response, message: string, data?: any) => {
    return res.status(code).json({
        error: false,
        message,
        data,
    })
}