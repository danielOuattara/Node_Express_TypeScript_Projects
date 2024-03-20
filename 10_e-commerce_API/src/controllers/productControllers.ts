import { RequestHandler } from "express";
import Product from "./../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { ICreateProductReqBody } from "../@types/product";
import { NotFoundError } from "../errors";
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

export const getAllProducts: RequestHandler = async (_req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

//--------------------------------------------------------------
export const getSingleProduct: RequestHandler = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new NotFoundError(
      `No product found with ID: ${req.params.productId}`,
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

//--------------------------------------------------------------

export const updateProduct: RequestHandler = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Product updated successfully", product });
};

//--------------------------------------------------------------

export const deleteProduct: RequestHandler = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};

//--------------------------------------------------------------

export const uploadImage: RequestHandler = (_req, res) => {
  res.send("uploadImage route");
};

//--------------------------------------------------------------
