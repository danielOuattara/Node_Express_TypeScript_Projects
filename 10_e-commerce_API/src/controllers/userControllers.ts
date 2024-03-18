import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";

//-----------------------------------------------------

/*find({filter}).select(projection) */
// export const getAllUsers: RequestHandler = async (_req, res) => {
//   const users = await User.find({ role: "user" }).select("-password");
//   return res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
// };

/* OR */

// find({filter}, projection)
export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  return res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

//-----------------------------------------------------

// export const getSingleUser: RequestHandler = async (req, res) => {
//   const user = await User.findById(req.params.userId, "-password");

//   if (!user) {
//     throw new NotFoundError(`User Not Found with id ${req.params.userId}`);
//   }
//   return res.status(StatusCodes.OK).json({ user });
// };

/* OR */

export const getSingleUser: RequestHandler = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );

  if (!user) {
    throw new NotFoundError(`User Not Found with id ${req.params.userId}`);
  }
  return res.status(StatusCodes.OK).json({ user });
};

//-----------------------------------------------------

export const showCurrentUser: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.OK).json({ user: req.user });
};

//-----------------------------------------------------

export const updateUser: RequestHandler = async (_req, res) => {
  return res.send("updateUser");
};

//-----------------------------------------------------

export const updateUserPassword: RequestHandler<{}, {}, IReqBody> = async (
  req,
  res,
) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    throw new BadRequestError("newPassword and oldPassword are required !");
  }

  const user = await User.findById(req.user?._id);
  // check user exists !
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

  // send back response to user
  res.status(StatusCodes.OK).json({ message: "Password successfully updated" });
};
