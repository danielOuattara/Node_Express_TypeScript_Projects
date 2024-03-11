import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "./../errors";

//-----------------------------------------------------

const register: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

//-----------------------------------------------------

const login: RequestHandler = (_req, res) => {
  res.send("login user");
};

//-----------------------------------------------------

const logout: RequestHandler = (_req, res) => {
  res.send("logout user");
};

export { register, login, logout };
