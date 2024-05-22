import { RequestHandler } from "express";
import { IUserLoginReqBody, IUserRegisterReqBody, IUserVerificationEmailReqBody } from "../@types/user";
export declare const register: RequestHandler<{}, {}, IUserRegisterReqBody>;
export declare const verifyEmail: RequestHandler<{}, {}, IUserVerificationEmailReqBody>;
export declare const login: RequestHandler<{}, {}, IUserLoginReqBody>;
export declare const logout: RequestHandler;
export declare const forgotPassword: RequestHandler;
export declare const resetPassword: RequestHandler;
