import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import { IUserUpdateReqBody, IUserUpdatePasswordReqBody } from "../@types/user";
import { checkAuthOrAdmin } from "../utilities";
import { Types } from "mongoose";

//-----------------------------------------------------

export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  return res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

//-----------------------------------------------------

export const getSingleUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Access denied");
  }
  checkAuthOrAdmin(req.user, new Types.ObjectId(req.params.userId));

  res.status(StatusCodes.OK).json({ user: req.user! });
};

//-----------------------------------------------------

export const showCurrentUser: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    user: { name: req.user!.name, userId: req.user!._id, role: req.user!.role },
  });
};

//-----------------------------------------------------
/*
 * user.save() method
 */

// export const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody> = async (
//   req,
//   res,
// ) => {
//   if (!req.body.name || !req.body.email) {
//     throw new BadRequestError("Name and Email are required !");
//   }
//   const user = await User.findById(req.user!._id);
//   if (!user) {
//     throw new UnauthenticatedError("User unknown");
//   }

//   user.name = req.body.name;
//   user.email = req.body.email;

//   await user.save();
//   user.attachCookiesToResponse(res);
//   res.status(StatusCodes.OK).json({ message: "User updated successfully" });
// };

//--- OR --------------------------------------------------------------

/*
 * user.updateOne() method
 */

export const updateUser: RequestHandler<{}, {}, IUserUpdateReqBody> = async (
  req,
  res,
) => {
  if (!req.body.name || !req.body.email) {
    throw new BadRequestError("Name and Email are required !");
  }
  const user = await User.findById(req.user!._id);
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  await user.updateOne(req.body, { new: true, runValidators: true });

  // this function attaches cookies to res
  user.attachCookiesToResponse({ res });
  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};

//-----------------------------------------------------

export const updateUserPassword: RequestHandler<
  {},
  {},
  IUserUpdatePasswordReqBody
> = async (req, res) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    throw new BadRequestError("newPassword and oldPassword are required !");
  }

  // check user exists !
  const user = await User.findById(req.user!._id);
  if (!user) {
    throw new NotFoundError("Email and Password are required !");
  }

  // check old password !
  const isValidPassword = await user.verifyPassword(req.body.oldPassword);
  if (!isValidPassword) {
    throw new UnauthenticatedError("User unknown");
  }

  user.password = req.body.newPassword;
  user.save();
  res.status(StatusCodes.OK).json({ message: "Password successfully updated" });
};
