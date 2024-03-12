import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utilities";

//-----------------------------------------------------

enum ROLE {
  admin = "admin",
  user = "user",
}
const register: RequestHandler = async (req, res) => {
  // first registered user should be an admin
  const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;

  const user = await User.create({ ...req.body, role });

  const userPayload = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT(userPayload);
  res.status(StatusCodes.CREATED).json({ user: userPayload, token });
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
