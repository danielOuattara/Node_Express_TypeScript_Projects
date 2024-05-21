/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types, Document } from "mongoose";
import { Response } from "express";
export declare enum ROLE {
    admin = "admin",
    user = "user"
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: ROLE;
    verificationToken: string;
    emailIsVerified: boolean;
    emailVerificationDate: Date;
}
export interface IPayload {
    name: string;
    userId: Types.ObjectId;
    role: string;
}
export interface IUserRegisterReqBody {
    name: string;
    email: string;
    password: string;
}
export interface IUserLoginReqBody {
    email: string;
    password: string;
}
export interface IUserUpdateReqBody {
    name: string;
    email: string;
}
export interface IUserUpdatePasswordReqBody {
    password: string;
    oldPassword: string;
    newPassword: string;
}
export interface IUserTokenPayload {
    name: string;
    userId: Types.ObjectId;
    role: string;
}
export interface IUserMethods {
    verifyPassword(pwd: string): Promise<boolean>;
    createJWT(payload: IUserTokenPayload): string;
    attachCookiesToResponse(res: Response): Response;
}
export interface IUserVerificationEmailReqBody {
    verificationToken: string;
    email: string;
}
export type MongooseUser = ((Document<unknown, {}, IUser> & Omit<IUser & {
    _id: Types.ObjectId;
}, keyof IUserMethods> & IUserMethods) & {
    isTestUser: boolean;
    isAdmin: boolean;
}) | null;
