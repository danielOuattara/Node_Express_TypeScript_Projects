import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { IUserLoginReqBody, IUserRegisterReqBody, ROLE } from "../@types/user";
import { randomBytes } from "node:crypto";

//-----------------------------------------------------
/** first registered user should be an admin */
export const register: RequestHandler<{}, {}, IUserRegisterReqBody> = async (
  req,
  res,
) => {
  const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;
  // generate verificationToken
  const verificationToken = randomBytes(32).toString("hex");
  const user = await User.create({ ...req.body, role, verificationToken });

  res.status(StatusCodes.CREATED).json({
    msg: "Successful Registered. Please check your email account ",
    verificationToken: user.verificationToken,
  });
};

//-----------------------------------------------------

export const login: RequestHandler<{}, {}, IUserLoginReqBody> = async (
  req,
  res,
) => {
  // check email & password presents
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Email and Password are required !");
  }

  // check user exists !
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  // check email & password presents
  if (!user.isVerified) {
    throw new UnauthenticatedError(
      "Please check your email to confirm your registration !",
    );
  }

  // check password !
  const isValidPassword = await user.verifyPassword(req.body.password);
  if (!isValidPassword) {
    throw new UnauthenticatedError("User unknown");
  }

  user.attachCookiesToResponse(res);
  res.status(StatusCodes.OK).json({ message: "Login successful" });
};

//-----------------------------------------------------

export const logout: RequestHandler = (_req, res) => {
  User.destroyCookiesInResponse(res);
  res.status(StatusCodes.OK).json({ message: "User is logged out" });
};
