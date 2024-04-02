import { RequestHandler } from "express";
import { IUserPatchReqBody, IUserUpdatePasswordReqBody } from "../@types/user";
export declare const getAllUsers: RequestHandler;
export declare const getSingleUser: RequestHandler;
export declare const showCurrentUser: RequestHandler;
export declare const patchUser: RequestHandler<{}, {}, IUserPatchReqBody>;
export declare const updateUserPassword: RequestHandler<{}, {}, IUserUpdatePasswordReqBody>;
