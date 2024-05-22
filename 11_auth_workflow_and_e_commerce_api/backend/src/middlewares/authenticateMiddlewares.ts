import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthenticatedError } from "../errors";
import User from "../models/UserModel";
import { MongooseUser } from "../@types/user";
import UnauthorizedError from "../errors/unauthorized-error ";
import { isTokenValid } from "../utilities/auth/jwt";

//----------------------------------------------------------
/**
 * Better: register in the "req" object a complete Mongoose user object
 * with all possible associations & methods.
 */

export const authenticateUser: RequestHandler = async (req, _res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    // 1 : check "accessToken" cookie
    if (accessToken) {
      const accessTokenPayload = isTokenValid(accessToken);
      const user = await User.findById(accessTokenPayload.userId).select(
        "-password",
      );
      if (!user) {
        throw new UnauthenticatedError("User unknown");
      }
      const isTestUser = user._id.equals(process.env.TEST_USER_ID as string);
      const isAdmin = user.role === "admin";
      req.user = { ...user.toObject({}), isTestUser, isAdmin } as MongooseUser;
      return next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Request Denied !");
  }
};

//----------------------------------------------------------

export const authenticateRoles = (...roles: string[]) => {
  return function (req: Request, _res: Response, next: NextFunction) {
    if (!roles.includes(req.user!.role)) {
      throw new UnauthorizedError(`Request denied for ${req.user!.role} role`);
    }
    next();
  };
};

//----------------------------------------------------------
/* solution n°2 to check for 'admin' */
export const authenticateAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user!.isAdmin) {
    throw new UnauthorizedError("Again Request Denied! Admin Access Only");
  }
  next();
};
