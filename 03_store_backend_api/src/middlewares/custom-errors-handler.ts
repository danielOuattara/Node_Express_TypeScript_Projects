import { NextFunction, Request, Response } from "express";

interface ICustomError extends Error {
  statusCode: number;
}

const customErrorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("err = ", err);

  return res.status(450).json({ message: err.message });
};

export default customErrorHandler;
