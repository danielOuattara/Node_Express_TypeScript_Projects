import { Schema, InferSchemaType, Model } from "mongoose";
import { Response } from "express";
import { ROLE, IPayload } from "../@types/user";
declare const schema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    emailIsVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    emailVerificationDate?: NativeDate | null | undefined;
    passwordToken?: string | null | undefined;
    passwordTokenExpiration?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    emailIsVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    emailVerificationDate?: NativeDate | null | undefined;
    passwordToken?: string | null | undefined;
    passwordTokenExpiration?: NativeDate | null | undefined;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    emailIsVerified: boolean;
    role?: ROLE | null | undefined;
    verificationToken?: string | null | undefined;
    emailVerificationDate?: NativeDate | null | undefined;
    passwordToken?: string | null | undefined;
    passwordTokenExpiration?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
type TUser = InferSchemaType<typeof schema>;
interface IUserMethods {
    verifyPassword(pwd: string): Promise<boolean>;
    createJWT(payload: IPayload): string;
    attachCookiesToResponse({ res, refreshToken, }: {
        res: Response;
        refreshToken?: string;
    }): Response;
}
interface UserModel extends Model<TUser, {}, IUserMethods> {
    destroyCookiesInResponse(res: Response): Response;
}
declare const User_v2: UserModel;
export default User_v2;
