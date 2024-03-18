import { RequestHandler } from "express";
export declare const getAllUsers: RequestHandler;
export declare const getSingleUser: RequestHandler;
export declare const showCurrentUser: RequestHandler;
export declare const updateUser: RequestHandler<{}, {}, IReqBody>;
export declare const updateUserPassword: RequestHandler<{}, {}, IReqBody>;
