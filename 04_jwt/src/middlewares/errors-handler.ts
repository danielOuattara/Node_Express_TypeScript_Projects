import { NextFunction, Request, Response } from "express";
import CustomAPIError from "../errors/custom-error";

interface ICustomError extends Error {
  statusCode: number;
}

const errorHandlerMiddleware = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};

export default errorHandlerMiddleware;
