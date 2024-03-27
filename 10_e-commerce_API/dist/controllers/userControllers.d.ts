import { RequestHandler } from "express";
import { IUserRegisterReqBody } from "../@types/user";
export declare const getAllUsers: RequestHandler;
export declare const getSingleUser: RequestHandler;
export declare const showCurrentUser: RequestHandler;
export declare const updateUser: RequestHandler<{}, {}, IUserRegisterReqBody>;
export declare const updateUserPassword: RequestHandler<{}, {}, IUserRegisterReqBody>;
