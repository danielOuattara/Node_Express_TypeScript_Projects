import { RequestHandler } from "express";
import Product from "./../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { IProduct } from "../@types/product";
import { BadRequestError, NotFoundError } from "../errors";
import { join } from "node:path";
import { IReview } from "../@types/reviews";
//--------------------------------------------------------------

export const createProduct: RequestHandler<{}, {}, IProduct> = async (
  req,
  res,
) => {
  req.body.user = req.user!._id; // user _id required in product model
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//--------------------------------------------------------------

export const getAllProducts: RequestHandler = async (_req, res) => {
  const products = await Product.find({}).populate<{ product: IReview }>({
    path: "reviews",
    select: "_id rating title comment user -product",
  });
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

//--------------------------------------------------------------
export const getSingleProduct: RequestHandler = async (req, res) => {
  const product = await Product.findById(req.params.productId).populate<{
    product: IReview;
  }>({
    path: "reviews",
    select: "_id rating title comment user -product",
  });

  if (!product) {
    throw new NotFoundError(
      `No product found with ID: ${req.params.productId}`,
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

//--------------------------------------------------------------

export const patchProduct: RequestHandler = async (req, res) => {
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

export const uploadImage: RequestHandler = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;
  if (Array.isArray(productImage)) {
    /** Handle multiple files here */
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("Please send one image per request");
  } else {
    /** Handle single file */
    if (!productImage.mimetype.startsWith("image")) {
      throw new BadRequestError("Only image can be uploaded");
    }
    if (productImage.size > parseInt(process.env.IMAGE_MAX_SIZE! as string)) {
      throw new BadRequestError("Image max size is 1Mb");
    }

    const imagePath = join(
      __dirname,
      "./../public/uploads/" + `${productImage.name}`,
    );
    await productImage.mv(imagePath);
    res
      .status(StatusCodes.OK)
      .json({ image: { src: `/uploads/${productImage.name}` } });
  }
};

//--------------------------------------------------------------
