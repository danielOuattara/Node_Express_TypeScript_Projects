import { RequestHandler } from "express";
import Product from "../models/productModel";

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   throw new Error("testing error for express-async-errors");
//   res.status(200).json("product testing route");
// };

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   const products = await Product.find({});
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   const products = await Product.find({ featured: true });
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
const getAllProductsStatic: RequestHandler = async (_req, res) => {
  const products = await Product.find({ featured: true, name: "vase table" });
  res.status(200).json({ numberOfHits: products.length, products });
};

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (_req, _res) => {
//   throw new Error("Testing express-async-error");
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (_req, res) => {
//   res.status(200).json({ message: "products route" });
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (req, res) => {
//   console.log(req.query);
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (req, res) => {
/*--> http://localhost:5000/api/v1/products?featured=true&page=2 */
//   console.log("req.query = ", req.query);
//  /* "page" does not exist in the model */
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
const getAllProducts: RequestHandler = async (req, res) => {
  // console.log("req.query = ", req.query);
  // const products = await Product.find(req.query);

  /*------------------------------------------------*/
/*--> http://localhost:5000/api/v1/products?featured=true */
  const { featured } = req.query; 
  const queryObject: { [k: string]: string | number | boolean } = {}; // test for query item first !  
  
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log("queryObject = ", queryObject);
  
  const products = await Product.find(queryObject);
  res.status(200).json({ numberOfHits: products.length, products });
};

export { getAllProducts, getAllProductsStatic };
