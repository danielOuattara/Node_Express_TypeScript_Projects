import { RequestHandler } from "express";
import { BadRequestError } from "../errors";

const testUser: RequestHandler = async (req, _res, next) => {
  if (req.user!.isTestUser) {
    throw new BadRequestError("Test User. Read Only data !");
  }
  next();
};

export default testUser;
