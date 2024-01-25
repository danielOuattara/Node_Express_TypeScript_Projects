// import { RequestHandler } from "express";
// import CustomAPIError from "../errors/custom-error";
// import jwt from "jsonwebtoken";

// //---------------------------------------------------------------------------

// const login: RequestHandler = async (req, res) => {
//   /* validations : - mongoose - Joi - controller check */
//   if (!req.body.username || !req.body.password) {
//     throw new CustomAPIError("Please, provide username AND password", 400);
//   }
//   const token = jwt.sign(
//     { id: new Date().getTime(), username: req.body.username },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "1h" },
//   );
//   return res.status(200).json({ msg: "User successfully logged in", token });
// };

// // ---------------------------------------------------------------------------

// const dashboard: RequestHandler = async (req, res) => {
//   return res.status(200).json({
//     msg: `Hello ${req.user?.username}`,
//     secret: Math.floor(Math.random() * 101),
//   });
// };

// //----------------------------------------------------------------------------
// export { login, dashboard };

// =============================================================  Using specific class Error !

import { RequestHandler } from "express";
import { BadRequestError } from "../errors";
import jwt from "jsonwebtoken";

//---------------------------------------------------------------------------

const login: RequestHandler = async (req, res) => {
  /* validations : - mongoose - Joi - controller check */
  if (!req.body.username || !req.body.password) {
    throw new BadRequestError("Please, provide username AND password");
  }
  const token = jwt.sign(
    { id: new Date().getTime(), username: req.body.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  return res.status(200).json({ msg: "User successfully logged in", token });
};

// ---------------------------------------------------------------------------

const dashboard: RequestHandler = async (req, res) => {
  return res.status(200).json({
    msg: `Hello ${req.user?.username}`,
    secret: Math.floor(Math.random() * 101),
  });
};

//----------------------------------------------------------------------------
export { login, dashboard };
