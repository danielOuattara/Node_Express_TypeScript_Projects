import { Response } from "express";
import { createJWT } from "./jwt";
import { Types } from "mongoose";

interface IPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

export const attachCookiesToResponse = (res: Response, payload: IPayload) => {
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
