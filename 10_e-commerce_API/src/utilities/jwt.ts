import { sign, verify, type Secret } from "jsonwebtoken";
import { IUserTokenPayload } from "../@types/user";

/**
 * functions here are no more used, but kept for legacy.
 * Equivalent method in Mongoose model
 */

//
export const createJWT = (payload: IUserTokenPayload) =>
  sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

//
export const isTokenValid = (token: string) =>
  verify(token, process.env.JWT_SECRET as Secret) as IUserTokenPayload;
