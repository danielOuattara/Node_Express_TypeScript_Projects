import { RequestHandler } from "express";

//--------------------------------------------------------------

export const createProduct: RequestHandler = (_req, res) => {
  res.send("createProduct route");
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
