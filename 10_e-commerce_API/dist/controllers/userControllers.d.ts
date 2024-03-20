import { RequestHandler } from "express";
import { IUserReqBody } from "../@types/user";
export declare const getAllUsers: RequestHandler;
export declare const getSingleUser: RequestHandler;
export declare const showCurrentUser: RequestHandler;
export declare const updateUser: RequestHandler<{}, {}, IUserReqBody>;
export declare const updateUserPassword: RequestHandler<{}, {}, IUserReqBody>;
