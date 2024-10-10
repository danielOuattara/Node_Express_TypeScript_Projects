import { Types } from "mongoose";
import { MongooseUser } from "../../@types/user";
export declare const checkAuthOrAdmin: (requestUser: MongooseUser, resourceUserId: Types.ObjectId) => void;
