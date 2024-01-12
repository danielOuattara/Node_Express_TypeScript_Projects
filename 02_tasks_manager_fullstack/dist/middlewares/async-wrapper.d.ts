import { NextFunction, Request, Response } from "express";
declare const asyncWrapper: (func: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncWrapper;
