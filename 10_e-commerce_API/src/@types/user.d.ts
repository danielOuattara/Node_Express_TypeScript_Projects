import { Types, Document } from "mongoose";
import { Response } from "express";

declare enum ROLE {
  admin = "admin",
  user = "user",
}
interface IUser {
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

interface IPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

interface IUserReqBody {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
}

interface IUserTokenPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

interface IUserMethods {
  verifyPassword(pwd: string): Promise<boolean>;
  createJWT(payload: IUserTokenPayload): string;
  attachCookiesToResponse(res: Response): Response;
}

type MongooseUser =
  | ((Document<
      unknown,
      {},
      {
        name: string;
        email: string;
        password: string;
        role: string;
      }
    > &
      Omit<
        {
          name: string;
          email: string;
          password: string;
          role: string;
        } & {
          _id: Types.ObjectId;
        },
        keyof IUserMethods
      > &
      IUserMethods) & { isTestUser: boolean; isAdmin: boolean })
  | null;
