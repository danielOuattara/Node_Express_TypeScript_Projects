// --> good for simple user types definition

// declare namespace Express {
//   interface Request {
//     user?: {
//       userId: string;
//       username: string;
//     };
//   }
// }

//----------------------------------------------------------------

//--> good for mongoose complete user types definition

// import { Types, Document } from "mongoose";
// import { Request } from "express";

// interface IUserMethods {
//   getName(): string;
//   createJWT(): string;
//   comparePassword(pwd: string): Promise<boolean>;
// }

// type MongooseUser =
//   | (Document<
//       unknown,
//       {},
//       {
//         name: string;
//         email: string;
//         password: string;
//       }
//     > &
//       Omit<
//         {
//           name: string;
//           email: string;
//           password: string;
//         } & {
//           _id: Types.ObjectId;
//         },
//         keyof IUserMethods
//       > &
//       IUserMethods)
//   | null;

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: MongooseUser;
//   }
// }

import { Types, Document } from "mongoose";
import { Response } from "express";
interface ITokenPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

interface IUserMethods {
  verifyPassword(pwd: string): Promise<boolean>;
  createJWT(payload: ITokenPayload): string;
  attachCookiesToResponse(res: Response): Response;
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

declare module "express-serve-static-core" {
  interface Request {
    user?: MongooseUser;
  }
}
