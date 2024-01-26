import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";

//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

//------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
  res.send("login user");
};

export { register, login };
