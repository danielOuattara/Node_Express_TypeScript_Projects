import { sign, verify, type Secret } from "jsonwebtoken";
import { IUserTokenPayload } from "../@types/user";

//
export const createJWT = (payload: IUserTokenPayload) =>
  /**
   * This function is no more used, but kept for legacy.
   * Equivalent method in Mongoose model
   */
  sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

//
export const isTokenValid = (token: string) =>
  verify(token, process.env.JWT_SECRET as Secret) as IUserTokenPayload;
