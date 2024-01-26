import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError } from "./../errors";
import jwt from "jsonwebtoken";

//------------------------------------------------------------
const register: RequestHandler = async (req, res) => {
  // if (!req.body.name || !req.body.email || !req.body.password) {
  //   throw new BadRequestError("Please provide: name, email, password");
  // }
  const user = await User.create(req.body);

  const token = await jwt.sign(req.body, process.env.JWT_SECRET as string, {expiresIn: "1h"})

 
  res.status(StatusCodes.CREATED).json({user, token});
};

//------------------------------------------------------------
const login: RequestHandler = async (_req, res) => {
  res.send("login user");
};

export { register, login };
