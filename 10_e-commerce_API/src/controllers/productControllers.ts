import { RequestHandler } from "express";
import Product from "./../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { ICreateProductReqBody } from "../@types/product";
//--------------------------------------------------------------

export const createProduct: RequestHandler<
  {},
  {},
  ICreateProductReqBody
> = async (req, res) => {
  req.body.user = req.user!._id; // user _id required in product model
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//--------------------------------------------------------------

export const getAllProducts: RequestHandler = (_req, res) => {
  res.send("getAllProducts route");
};

//--------------------------------------------------------------
export const getSingleProduct: RequestHandler = (_req, res) => {
  res.send("getSingleProduct route");
};

//--------------------------------------------------------------

export const updateProduct: RequestHandler = (_req, res) => {
  res.send("updateProduct route");
};

//--------------------------------------------------------------

export const deleteProduct: RequestHandler = (_req, res) => {
  res.send("deleteProduct route");
};

//--------------------------------------------------------------

export const uploadImage: RequestHandler = (_req, res) => {
  res.send("uploadImage route");
};

//--------------------------------------------------------------
