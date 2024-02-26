// import { NextFunction, Request, Response } from "express";
// import { CustomAPIError } from "../errors";
// import { StatusCodes } from "http-status-codes";

// interface ICustomError extends Error {
//   statusCode: number;
// }

// const errorHandler = (
//   err: ICustomError,
//   _req: Request,
//   res: Response,
//   _next: NextFunction,
// ) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   }
//   return res
//     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     .json({err});
// };

// export default errorHandler;

//--------------------------------------------------------------------

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface ICustomError extends Error {
  statusCode: number;
  code?: number;
  keyValue?: {
    [key: string]: string;
  };
}

const errorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("ERROR ==> ", err.message);

  const customError: ICustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something wrong, try again later",
    name: err.name || "Custom Error",
  };

  if (err.code && err.code === 11000) {
    // Check if err.keyValue is defined
    if (err.keyValue) {
      const keys = Object.keys(err.keyValue);
      const values = Object.values(err.keyValue);

      // Check if keys and values are present
      if (keys.length > 0 && values.length > 0) {
        customError.message = `Duplicate ${keys[0]}: ${values[0]} Please, choose another one !`;
      }
    }

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};

export default errorHandler;
