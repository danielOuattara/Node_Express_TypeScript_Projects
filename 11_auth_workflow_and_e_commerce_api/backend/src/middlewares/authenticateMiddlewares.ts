import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthenticatedError } from "../errors";
import User from "../models/UserModel";
import { MongooseUser } from "../@types/user";
import UnauthorizedError from "../errors/unauthorized-error ";
import { isTokenValid } from "../utilities/auth/jwt";
import Token from "./../models/TokenModel";

//----------------------------------------------------------
/**
 * Better: register in the "req" object a complete Mongoose user object
 * with all possible associations & methods.
 */

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  // 1 : check "accessToken" cookie
  if (accessToken) {
    const accessTokenPayload = isTokenValid(accessToken);
    const user = await User.findById(accessTokenPayload.userId).select(
      "-password",
    );
    if (!user) {
      throw new UnauthenticatedError("User unknown 1");
    }
    const isTestUser = user._id.equals(process.env.TEST_USER_ID as string);
    const isAdmin = user.role === "admin";
    req.user = { ...user.toObject({}), isTestUser, isAdmin } as MongooseUser;
    return next();
  }

  // 2 : check "refreshToken" in order to renew all accessToken
  else if (refreshToken) {
    const refreshTokenPayload = isTokenValid(refreshToken);

    // get Token information, to check for 'isValid'
    const userToken = await Token.findOne({
      user: refreshTokenPayload.userId,
      refreshToken: refreshTokenPayload.refreshToken,
    });

    // Block the user, depending on "isValid" is true/false
    if (!userToken || !userToken["isValid"]) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    // if all OK, renew all accessToken

    const user = await User.findById(refreshTokenPayload.userId).select(
      "-password",
    );

    if (!user) {
      throw new UnauthenticatedError("User unknown 2");
    }
    user.attachCookiesToResponse({
      res,
      refreshToken: refreshTokenPayload.refreshToken,
    });
    const isTestUser = user._id.equals(process.env.TEST_USER_ID as string);
    const isAdmin = user.role === "admin";
    req.user = { ...user.toObject({}), isTestUser, isAdmin } as MongooseUser;
    return next();
  } else {
    throw new UnauthenticatedError("All tokens expired, please login again");
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
