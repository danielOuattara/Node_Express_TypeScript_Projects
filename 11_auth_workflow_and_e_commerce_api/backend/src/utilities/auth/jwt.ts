import { sign, verify, type Secret } from "jsonwebtoken";
import { IUserTokenPayload } from "../../@types/user";

/**
 * These functions are no more used, but kept for legacy.
 * Equivalent method in Mongoose model
 */
//
export const createJWT = (payload: IUserTokenPayload) =>
  /**
   * Equivalent method in Mongoose model
   */
  sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

//
export const isTokenValid = (token: string) =>
  verify(token, process.env.JWT_SECRET as Secret) as IUserTokenPayload;
