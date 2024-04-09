import { Response } from "express";
import { createJWT } from "./jwt";
import { IUserTokenPayload } from "../@types/user";

/**
 * functions here are no more used, but kept for legacy.
 * Equivalent method in Mongoose model
 */

//
export const attachCookiesToResponse = (
  res: Response,
  payload: IUserTokenPayload,
) => {
  // creating jwt token
  const token = createJWT(payload);

  // attach cookies to response
  return res.cookie("access_token", "Bearer " + token, {
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

//
export const destroyCookiesInResponse = (res: Response) => {
  // change the cookie value + make it expire now !
  return res.cookie("access_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
};
