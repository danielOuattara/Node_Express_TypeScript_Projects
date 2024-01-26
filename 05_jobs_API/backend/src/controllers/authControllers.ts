import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError } from "./../errors";
//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token: user.createJWT() });
};

//------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
  // if (!req.body.name || !req.body.email || !req.body.password) {
  //   throw new BadRequestError("Please provide: name, email, password");
  // }
  res.send("login user");
};

export { register, login };
