import { NextFunction, Request, Response } from "express";
export declare const asyncWrapper: (func: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
