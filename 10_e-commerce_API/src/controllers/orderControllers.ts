import { RequestHandler } from "express";

//------------------------------------------

export const getAllOrders: RequestHandler = async (_req, res) => {
  res.send("getAllOrders route");
};

//------------------------------------------

export const getSingleOrder: RequestHandler = async (_req, res) => {
  res.send("getSingleOrder route");
};

//------------------------------------------

export const getCurrentUserOrders: RequestHandler = async (_req, res) => {
  res.send("getCurrentUserOrders route");
};

//------------------------------------------

export const createOrder: RequestHandler = async (_req, res) => {
  res.send("createOrder route");
};

//------------------------------------------

export const updateOrder: RequestHandler = async (_req, res) => {
  res.send("updateOrder route");
};

//------------------------------------------
