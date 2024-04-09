import { NextFunction, Request, RequestHandler, Response } from "express";
export declare const authenticateUser: RequestHandler;
export declare const authenticateRoles: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const authenticateAdmin: (req: Request, _res: Response, next: NextFunction) => void;
