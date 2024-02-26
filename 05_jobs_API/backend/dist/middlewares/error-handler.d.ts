import { NextFunction, Request, Response } from "express";
interface ICustomError extends Error {
    statusCode: number;
    code?: number;
    keyValue?: {
        [key: string]: string;
    };
    errors?: {
        [key: string]: {
            message: string;
        };
    };
}
declare const errorHandler: (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandler;
