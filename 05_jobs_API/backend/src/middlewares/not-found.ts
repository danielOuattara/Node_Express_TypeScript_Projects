import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  
  return res
    .status(StatusCodes.NOT_FOUND)
    .send("Route does not exist");
};

export default notFound;
