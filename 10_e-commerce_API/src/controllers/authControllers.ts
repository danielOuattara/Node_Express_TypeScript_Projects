import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
// import { attachCookiesToResponse } from "../utilities"; // regist.solution 1

//-----------------------------------------------------

enum ROLE {
  admin = "admin",
  user = "user",
}
/* register solution 1
------------------------ */

// const register: RequestHandler = async (req, res) => {
//   // first registered user should be an admin
//   const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;

//   const user = await User.create({ ...req.body, role });
//   const userPayload = { name: user.name, userId: user._id, role: user.role };

//   // this function attaches cookies to res
//   attachCookiesToResponse(res, userPayload);

//   res.status(StatusCodes.CREATED).json({ user: userPayload });
// };

/* register solution 2
---------------------- */

const register: RequestHandler = async (req, res) => {
  // first registered user should be an admin
  const role = (await User.countDocuments({})) === 0 ? ROLE.admin : ROLE.user;
  const user = await User.create({ ...req.body, role });
  user.attachCookiesToResponse(res);
  res.status(StatusCodes.CREATED).json({ user });
};

//-----------------------------------------------------

const login: RequestHandler = async (req, res) => {
  // check email & password presents
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Email and Password are required !");
  }

  // check user exists !
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  // check password !
  const isValidPassword = await user.verifyPassword(req.body.password);
  if (!isValidPassword) {
    throw new UnauthenticatedError("User unknown");
  }

  user.attachCookiesToResponse(res);

  // send back response to user
  res.status(StatusCodes.OK).json({ message: "Login successful" });
};

//-----------------------------------------------------

const logout: RequestHandler = (_req, res) => {
  res.send("logout user");
};

export { register, login, logout };
