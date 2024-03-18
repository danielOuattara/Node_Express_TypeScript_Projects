import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { NotFoundError /* , UnauthenticatedError */ } from "../errors";

//-----------------------------------------------------

/*find({filter}).select(projection) */
// export const getAllUsers: RequestHandler = async (_req, res) => {
//   const users = await User.find({ role: "user" }).select("-password");
//   res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
// };

/* OR */

// find({filter}, projection)
export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

//-----------------------------------------------------

// export const getSingleUser: RequestHandler = async (req, res) => {
//   const user = await User.findById(req.params.userId, "-password");

//   if (!user) {
//     throw new NotFoundError(`User Not Found with id ${req.params.userId}`);
//   }
//   res.status(StatusCodes.OK).json({ user });
// };

/* OR */

export const getSingleUser: RequestHandler = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );

  if (!user) {
    throw new NotFoundError(`User Not Found with id ${req.params.userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//-----------------------------------------------------

export const showCurrentUser: RequestHandler = async (_req, res) => {
  res.send("showCurrentUser");
};

//-----------------------------------------------------

export const updateUser: RequestHandler = async (_req, res) => {
  res.send("updateUser");
};

//-----------------------------------------------------

export const updateUserPassword: RequestHandler = async (_req, res) => {
  res.send("updateUserPassword");
};
