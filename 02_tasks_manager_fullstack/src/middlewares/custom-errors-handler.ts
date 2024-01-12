import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "./../errors/customError";

interface ICustomError extends Error {
  statusCode: number;
}

const customErrorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // res.status(500).send({ err });

  // res.status(err.status).send({ msg: err.message });

  if (err instanceof CustomAPIError) {
    /* first testing if the error received is our custom error*/
    return res.status(err.statusCode).json(err.message);
  } else {
    /* the error is not a custom error */
    return res.status(500).json(err.message);
  }
};

export default customErrorHandler;
