// import { RequestHandler } from "express";
// import CustomAPIError from "../errors/custom-error";
// import jwt from "jsonwebtoken";

// interface ITokenPayload {
//   id: string;
//   username: string;
// }

// const auth: RequestHandler = async (req, _res, next) => {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer")
//   ) {
//     throw new CustomAPIError("Not token provided", 401);
//   }

//   const token = req.headers.authorization.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string,
//     ) as ITokenPayload;

//     req.user = { id: decoded.id, username: decoded.username };
//     next();
//   } catch (err) {
//     throw new CustomAPIError("Not authorized", 401);
//   }
// };

// export default auth;

//-----------------------------------------------------------------------

import { RequestHandler } from "express";
import { UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  username: string;
}

const auth: RequestHandler = async (req, _res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new UnauthenticatedError("Not token provided");
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as ITokenPayload;

    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Not token provided");
  }
};

export default auth;
