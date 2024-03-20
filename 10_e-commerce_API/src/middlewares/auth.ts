import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "./../utilities/jwt";
import User from "../models/UserModel";
import { MongooseUser } from "../@types/user";
import UnauthorizedError from "../errors/unauthorized-error ";

//----------------------------------------------------------

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
      const isAdmin = user.role === "admin";
      req.user = { ...user.toObject(), isTestUser, isAdmin } as MongooseUser;
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Request Denied !");
  }
};

//----------------------------------------------------------

export const authRoles = (...roles: string[]) => {
  return function (req: Request, _res: Response, next: NextFunction) {
    if (!roles.includes(req.user!.role)) {
      throw new UnauthorizedError(`Request denied for ${req.user!.role} role`);
    }
    next();
  };
};

//----------------------------------------------------------
/* solution n°2 to check for 'admin' */
export const authAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user!.isAdmin) {
    throw new UnauthorizedError("Again Request Denied! Admin Access Only");
  }
  next();
};
