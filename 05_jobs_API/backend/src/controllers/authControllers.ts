import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "./../errors";
//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token: user.createJWT() });
};

//------------------------------------------------------------
const login: RequestHandler = async (req, res) => {
  // check credentials !
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide: email and password");
  }
  // check user exists !
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("User unknown!");
  }

  // compare password
  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword) {
    throw new UnauthenticatedError("User unknown!");
  }

  //All is OK: send token
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.getName() }, token: user.createJWT() });
};

export { register, login };
