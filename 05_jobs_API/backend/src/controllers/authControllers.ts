import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "./../errors";
import brcypt from "bcryptjs";
//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide: name, email, password");
  }

  const salt = await brcypt.genSalt(10);
  const hashedPassword = await brcypt.hash(req.body.password, salt);

  const tempUSer = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const user = await User.create(tempUSer);
  res.status(StatusCodes.CREATED).json(tempUSer);
};

//------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
  res.send("login user");
};

export { register, login };
