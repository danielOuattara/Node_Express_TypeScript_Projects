import { RequestHandler } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "./../utilities/jwt";
import User from "../models/UserModel";
import { MongooseUser } from "../custom";

export const authUser: RequestHandler = async (req, _res, next) => {
  const access_token: string = req.signedCookies.access_token;
  if (!access_token || !access_token.startsWith("Bearer")) {
    throw new UnauthenticatedError("Request Denied !");
  }

  try {
    const token = access_token.split(" ")[1];
    const payload = isTokenValid(token);

    /*
     * Better: register in the "req" object a complete Mongoose user object
     * with all possible associations & methods.
     */
    const user = await User.findById(payload.userId).select("-password");
    if (user) {
      const isTestUser = user._id.equals(process.env.TEST_USER_ID as string);
      req.user = { ...user.toObject(), isTestUser } as MongooseUser;
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Request Denied !");
  }
};
