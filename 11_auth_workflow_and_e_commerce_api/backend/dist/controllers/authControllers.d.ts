import { RequestHandler } from "express";
import { IUserLoginReqBody, IUserRegisterReqBody } from "../@types/user";
export declare const register: RequestHandler<{}, {}, IUserRegisterReqBody>;
export declare const login: RequestHandler<{}, {}, IUserLoginReqBody>;
export declare const logout: RequestHandler;
