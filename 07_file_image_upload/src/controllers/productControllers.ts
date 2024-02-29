import { RequestHandler } from "express";
import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";

//------------------------------------------------------------
const createProduct: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).send("create product");
};

//------------------------------------------------------------
const getAllProducts: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).send("get all products");
};

export { createProduct, getAllProducts };
