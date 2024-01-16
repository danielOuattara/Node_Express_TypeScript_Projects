import { RequestHandler } from "express";
import CustomAPIError from "../errors/custom-error";

//---------------------------------------------------------------------------


const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
    /* validations : - mongoose - Joi - controller check */
  if (!username || !password) {
    throw new CustomAPIError("Please, provide username AND password", 400);
  }
  return res.status(200).json({ msg: "Fake Login/register/signup routes" });
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
