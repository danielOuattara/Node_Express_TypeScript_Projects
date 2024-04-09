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
import { Schema, InferSchemaType, Model } from "mongoose";
import { Response } from "express";
import { ROLE, IPayload } from "../@types/user";
declare const schema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    verified?: Date | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    verified?: Date | null | undefined;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    verified?: Date | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
type TUser = InferSchemaType<typeof schema>;
interface IUserMethods {
    verifyPassword(pwd: string): Promise<boolean>;
    createJWT(payload: IPayload): string;
    attachCookiesToResponse(res: Response): Response;
}
interface UserModel extends Model<TUser, {}, IUserMethods> {
    destroyCookiesInResponse(res: Response): Response;
}
declare const User_v2: UserModel;
export default User_v2;
