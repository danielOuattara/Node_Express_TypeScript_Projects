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
  return res.status(500).json(err.message);
};

export default customErrorHandler;
