import { Model } from "mongoose";
import { Response } from "express";
import { IPayload, IUser } from "../@types/user";
interface IUserMethods {
    verifyPassword(pwd: string): Promise<boolean>;
    createJWT(payload: IPayload): string;
    attachCookiesToResponse({ res, refreshToken, }: {
        res: Response;
        refreshToken?: string;
    }): void;
}
interface UserModel extends Model<IUser, {}, IUserMethods> {
    destroyCookiesInResponse(res: Response): Response;
}
declare const User_v1: UserModel;
export default User_v1;
