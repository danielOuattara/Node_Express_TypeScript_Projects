import { Types, Document } from "mongoose";
import { Response } from "express";

export enum ROLE {
  admin = "admin",
  user = "user",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: ROLE;
  verificationToken: string;
  isVerified: boolean;
  emailVerificationDate: Date;
}

export interface IPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

export interface IUserRegisterReqBody {
  name: string;
  email: string;
  password: string;
}
export interface IUserLoginReqBody {
  email: string;
  password: string;
}

export interface IUserUpdateReqBody {
  name: string;
  email: string;
}
export interface IUserUpdatePasswordReqBody {
  password: string;
  oldPassword: string;
  newPassword: string;
}

export interface IUserTokenPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

export interface IUserMethods {
  verifyPassword(pwd: string): Promise<boolean>;
  createJWT(payload: IUserTokenPayload): string;
  attachCookiesToResponse(res: Response): Response;
}
export interface IUserVerificationEmailReqBody {
  verificationToken: string;
  email: string;
}

export type MongooseUser =
  | ((Document<
      unknown,
      {},
      {
        name: string;
        email: string;
        password: string;
        role: string;
        verificationToken: string;
        emailVerificationDate: boolean;
        verified: Date;
      }
    > &
      Omit<
        {
          name: string;
          email: string;
          password: string;
          role: string;
          verificationToken: string;
          isVerified: boolean;
          emailVerificationDate: Date;
        } & {
          _id: Types.ObjectId;
        },
        keyof IUserMethods
      > &
      IUserMethods) & { isTestUser: boolean; isAdmin: boolean })
  | null;
