import { NextFunction, Request, RequestHandler, Response } from "express";
export declare const authUser: RequestHandler;
export declare const authRoles: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const authAdmin: (req: Request, _res: Response, next: NextFunction) => void;
