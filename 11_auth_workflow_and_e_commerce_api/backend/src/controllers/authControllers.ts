import { RequestHandler } from "express";
import Token from "./../models/TokenModel";
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
import { sendResetPasswordEmail, sendVerificationEmail } from "../utilities";

//-----------------------------------------------------
/** first registered user should be an admin */
export const register: RequestHandler<{}, {}, IUserRegisterReqBody> = async (
  req,
  res,
) => {
  const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;
  const verificationToken = randomBytes(32).toString("hex");

  await User.create({
    ...req.body,
    role: req.body.role || role,
    verificationToken,
  });
  // const origin = `http://localhost:3000`;
  // const origin = req.get("x-forwarded-host") as string;
  const origin = `${req.protocol}://${req.get("host")}`;

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

  // create refresh token
  let refreshToken = "";

  /* --> check for existing refreshToken and take correct actions
  -----------------------------------------------------------------*/

  const existingUserToken = await Token.findOne({ user: user._id });

  if (existingUserToken && !existingUserToken["isValid"]) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (existingUserToken && existingUserToken["isValid"]) {
    user.attachCookiesToResponse({
      res,
      refreshToken: existingUserToken.refreshToken,
    });
    return res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, userId: user._id, role: user.role } });
  }
  /* --> first login: create refreshToken 
  ----------------------------------------- */
  refreshToken = randomBytes(64).toString("hex");

  const userToken = {
    refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    user: user._id,
  };

  await Token.create(userToken);

  user.attachCookiesToResponse({
    res,
    refreshToken,
  });

  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    user: { name: user.name, userId: user._id, role: user.role },
  });
};

//-----------------------------------------------------

export const logout: RequestHandler = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user!._id });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

//-----------------------------------------------------
/* 
- check for email, reject if not provided
- search for user using the email
- if no user do nothing, response OK and silence
- if user found then put the logic for this controller

*/
export const forgotPassword: RequestHandler = async (req, res) => {
  if (!req.body.email) {
    throw new BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email: req.body.email });

  if (user && user.emailIsVerified && user.verificationToken === "") {
    // generate passwordToken
    const passwordToken = randomBytes(128).toString("hex");
    const lengthTime = 1000 * 60 * 5; // 5 mins
    const passwordTokenExpiration = new Date(Date.now() + lengthTime);

    // update user infos on database
    user.passwordToken = passwordToken;
    user.passwordTokenExpiration = passwordTokenExpiration;
    const origin = req.get("x-forwarded-host") as string;

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken,
      origin,
    });

    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for more instructions" });
};

//-----------------------------------------------------

export const resetPassword: RequestHandler = async (_req, res) => {
  res.send("forgotPassword route");
};
