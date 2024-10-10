declare const Token_v2: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    ip: string;
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
    userAgent: string;
    isValid: boolean;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    ip: string;
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
    userAgent: string;
    isValid: boolean;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    ip: string;
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
    userAgent: string;
    isValid: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>;
export default Token_v2;
