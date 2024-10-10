import { IToken } from "../@types/token";
declare const Token_v1: import("mongoose").Model<IToken, {}, {}, {}, import("mongoose").Document<unknown, {}, IToken> & IToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>;
export default Token_v1;
