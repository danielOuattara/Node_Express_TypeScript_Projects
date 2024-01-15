import { RequestHandler } from "express";

//----------------------------------------------------------------------------------------------
const getAllProductsStatic: RequestHandler = async (_req, res) => {
  throw new Error("testing error for express-async-errors");
  res.status(200).json("product testing route");
};

//----------------------------------------------------------------------------------------------
const getAllProducts: RequestHandler = async (_req, res) => {
  res.status(200).json({ message: "products route" });
};

export { getAllProducts, getAllProductsStatic };
