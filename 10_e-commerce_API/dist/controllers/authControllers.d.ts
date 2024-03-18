import { RequestHandler } from "express";
export declare const register: RequestHandler<{}, {}, IReqBody>;
export declare const login: RequestHandler<{}, {}, IReqBody>;
export declare const logout: RequestHandler;
