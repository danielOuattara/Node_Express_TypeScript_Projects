import { RequestHandler } from "express";
import CustomAPIError from "../errors/custom-error";
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
    throw new CustomAPIError("Not token provied", 401);
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as ITokenPayload;
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new CustomAPIError("Not auhtorized", 401);
  }
};

export default auth;
