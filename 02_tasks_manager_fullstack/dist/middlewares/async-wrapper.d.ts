import { NextFunction, Request, RequestHandler, Response } from "express";
declare const asyncWrapper: (func: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncWrapper;
