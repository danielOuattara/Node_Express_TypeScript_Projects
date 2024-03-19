import { sign, verify, type Secret } from "jsonwebtoken";
import { ITokenPayload } from "../@types/custom";

//--------------------------------------------------------------------------------------

export const createJWT = (payload: ITokenPayload) =>
  sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

//--------------------------------------------------------------------------------------

export const isTokenValid = (token: string) =>
  verify(token, process.env.JWT_SECRET as Secret) as ITokenPayload;
