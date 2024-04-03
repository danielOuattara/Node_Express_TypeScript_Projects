import { RequestHandler } from "express";
import { IUserUpdateReqBody, IUserUpdatePasswordReqBody } from "../@types/user";
export declare const getAllUsers: RequestHandler;
export declare const getSingleUser: RequestHandler;
export declare const showCurrentUser: RequestHandler;
export declare const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody>;
export declare const updateUserPassword: RequestHandler<{}, {}, IUserUpdatePasswordReqBody>;
