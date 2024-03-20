import { RequestHandler } from "express";
import { IUserReqBody } from "../@types/user";
export declare const register: RequestHandler<{}, {}, IUserReqBody>;
export declare const login: RequestHandler<{}, {}, IUserReqBody>;
export declare const logout: RequestHandler;
