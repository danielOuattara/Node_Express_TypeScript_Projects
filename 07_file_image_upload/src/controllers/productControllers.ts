import { RequestHandler } from "express";
import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";

//------------------------------------------------------------
const createProduct: RequestHandler = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};

//------------------------------------------------------------
const getAllProducts: RequestHandler = async (_req, res) => {
  res.status(StatusCodes.OK).send("get all products");
};

export { createProduct, getAllProducts };
