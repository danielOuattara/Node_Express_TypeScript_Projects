import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
declare const customErrorHandler: (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => void;
export default customErrorHandler;
