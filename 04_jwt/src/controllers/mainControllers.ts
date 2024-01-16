import { RequestHandler } from "express";
import CustomAPIError from "../errors/custom-error";
import jwt from "jsonwebtoken";
//---------------------------------------------------------------------------

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
    /* validations : - mongoose - Joi - controller check */
  if (!username || !password) {
    throw new CustomAPIError("Please, provide username AND password", 400);
  }
  const id = new Date().getTime(); // id: here for development only !
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return res.status(200).json({ msg: "User successfully logged in", token });
};

// ---------------------------------------------------------------------------

const dashboard: RequestHandler = async (_req, res) => {
  return res
    .status(200)
    .json({
      message: "Hello John Doe",
      numberSecret: Math.floor(Math.random() * 101),
    });
};




//----------------------------------------------------------------------------
export { login, dashboard };
