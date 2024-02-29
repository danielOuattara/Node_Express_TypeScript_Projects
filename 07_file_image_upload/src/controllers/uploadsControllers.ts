import { RequestHandler } from "express";

import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const uploadProductImage: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).send("upload image");
};

export { uploadProductImage };
