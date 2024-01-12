import { NextFunction, Request, Response } from "express";

const asyncWrapper = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
