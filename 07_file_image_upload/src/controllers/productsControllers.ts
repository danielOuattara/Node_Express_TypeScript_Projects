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
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export { createProduct, getAllProducts };
