import { NextFunction, Request, Response } from "express";
interface ICustomError extends Error {
    statusCode: number;
}
declare const customErrorHandler: (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>>;
export default customErrorHandler;
