import { RequestHandler } from "express";
import { IUserRegisterReqBody } from "../@types/user";
export declare const register: RequestHandler<{}, {}, IUserRegisterReqBody>;
export declare const login: RequestHandler<{}, {}, IUserRegisterReqBody>;
export declare const logout: RequestHandler;
