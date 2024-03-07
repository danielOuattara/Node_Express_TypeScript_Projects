// import { RequestHandler } from "express";
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors";
// import User from "../models/UserModel";
// import { MongooseUser } from "../../custom";

// interface ITokenPayload {
//   userId: string;
//   username: string;
// }

// const auth: RequestHandler = async (req, _res, next) => {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer")
//   ) {
//     throw new UnauthenticatedError("No token provided");
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string,
//     ) as ITokenPayload;

//     /*--> Less: created local user object: only userId & name*/
//     // req.user = { userId: decoded.userId, username: decoded.username };

//     //
//     /* --> Better: register in "req" a complete Mongoose user object*/
//     //             with all possible associations.

//     const user = await User.findById(decoded.userId).select("-password");

//     if (user) {
//       const isTestUser = user._id.equals(process.env.TEST_USER_ID as string);
//       req.user = { ...user.toObject(), isTestUser } as MongooseUser;
//     }

//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("No token provided");
//   }
// };

// export default auth;
