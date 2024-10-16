import { Types } from "mongoose";
export interface IToken {
    refreshToken: string;
    ip: string;
    userAgent: string;
    isValid: boolean;
    user: Types.ObjectId;
}
