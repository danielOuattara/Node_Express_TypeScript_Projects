import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import {
  IUserLoginReqBody,
  IUserRegisterReqBody,
  IUserVerificationEmailReqBody,
  ROLE,
} from "../@types/user";
import { randomBytes } from "node:crypto";
import { sendVerificationEmail } from "../utilities";

//-----------------------------------------------------
/** first registered user should be an admin */
export const register: RequestHandler<{}, {}, IUserRegisterReqBody> = async (
  req,
  res,
) => {
  const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;
  const verificationToken = randomBytes(32).toString("hex");
  await User.create({ ...req.body, role, verificationToken });
  // const origin= `${req.protocol}://${req.get("host")}`,
  const origin = `http://localhost:3000`;
  await sendVerificationEmail({
    name: req.body.name,
    email: req.body.email,
    origin,
    verificationToken,
  });
  res.status(StatusCodes.CREATED).json({
    msg: "Successful Registered. Please check your email account ",
    // verificationToken: user.verificationToken,
  });
};

//-----------------------------------------------------

export const verifyEmail: RequestHandler<
  {},
  {},
  IUserVerificationEmailReqBody
> = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    verificationToken: req.body.verificationToken,
  });
  if (!user) {
    throw new UnauthenticatedError("User unknown, Verification Failed! ");
  }

  user.emailIsVerified = true;
  user.emailVerificationDate = new Date();
  user.verificationToken = "";

  await user.save();
  res.status(StatusCodes.OK).json({
    message: "Email is verified, you can login now",
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

  // check emailIsVerified
  if (!user.emailIsVerified) {
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
  res.status(StatusCodes.OK).json({ message: "Login successful", user });
};

//-----------------------------------------------------

export const logout: RequestHandler = (_req, res) => {
  User.destroyCookiesInResponse(res);
  res.status(StatusCodes.OK).json({ message: "User is logged out" });
};
