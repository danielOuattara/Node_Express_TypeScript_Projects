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
import { Schema, InferSchemaType, Types, Model } from "mongoose";
import { Response } from "express";
declare const schema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    role: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    role: string;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    role: string;
}> & {
    _id: Types.ObjectId;
}>;
interface IPayload {
    name: string;
    userId: Types.ObjectId;
    role: string;
}
type TUser = InferSchemaType<typeof schema>;
interface IUserMethods {
    verifyPassword(pwd: string): Promise<boolean>;
    createJWT(payload: IPayload): string;
    attachCookiesToResponse(res: Response): Response;
}
type UserModel = Model<TUser, {}, IUserMethods>;
declare const User: UserModel;
export default User;
