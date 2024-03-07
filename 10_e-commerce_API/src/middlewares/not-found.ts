import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFound: RequestHandler = (_req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
};

export default notFound;
