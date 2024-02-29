import { Types, Document } from "mongoose";

interface IUserMethods {
  getName(): string;
  createJWT(): string;
  comparePassword(pwd: string): Promise<boolean>;
}

export type MongooseUser =
  | ((Document<
      unknown,
      {},
      {
        name: string;
        email: string;
        password: string;
      }
    > &
      Omit<
        {
          name: string;
          email: string;
          password: string;
        } & {
          _id: Types.ObjectId;
        },
        keyof IUserMethods
      > &
      IUserMethods) & { isTestUser: boolean })
  | null;

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: MongooseUser;
//   }
// }

declare namespace Express {
  interface Request {
    user?: {
      id: string;
      username: string;
    };
  }
}
