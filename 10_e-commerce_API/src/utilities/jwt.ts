import { sign, verify, type Secret } from "jsonwebtoken";
import { Types } from "mongoose";

//--------------------------------------------------------------------------------------

interface IPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

export const createJWT = (payload: IPayload) =>
  sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

//--------------------------------------------------------------------------------------

export const isTokenValid = (token: string) =>
  verify(token, process.env.JWT_SECRET as Secret);
