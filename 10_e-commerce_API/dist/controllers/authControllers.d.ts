import { RequestHandler } from "express";
interface IReqBody {
    name?: string;
    email?: string;
    password?: string;
}
export declare const register: RequestHandler<{}, {}, IReqBody>;
export declare const login: RequestHandler<{}, {}, IReqBody>;
export declare const logout: RequestHandler;
export {};
