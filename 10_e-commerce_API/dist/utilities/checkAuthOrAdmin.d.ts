import { MongooseUser } from "../@types/user";
export declare const checkAuthOrAdmin: (requestUser: MongooseUser, resourceUserId?: string) => void;
