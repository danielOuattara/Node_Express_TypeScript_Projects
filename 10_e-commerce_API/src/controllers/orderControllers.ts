import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { BadRequestError, NotFoundError } from "../errors";
import {
  IParamsDictionary,
  IReqCreateOrder,
  ISingleOrderItem,
  IUpdateOrderReqBody,
} from "../@types/order";
import { checkAuthOrAdmin, fakeStripAPI } from "../utilities";

//------------------------------------------

export const createOrder: RequestHandler<{}, {}, IReqCreateOrder> = async (
  req,
  res,
) => {
  if (!req.body.cartItems || req.body.cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }

  if (!req.body.tax || !req.body.shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems: ISingleOrderItem[] = [];
  let subtotal = 0;

  for (const item of req.body.cartItems) {
    const itemInDatabase = await Product.findOne({ _id: item.product });

    if (!itemInDatabase) {
      throw new NotFoundError(`No product with id : ${item.product}`);
    }

    const singleValidOrderItem = {
      amount: item.amount,
      name: itemInDatabase.name,
      price: itemInDatabase.price,
      image: itemInDatabase.image,
      product: itemInDatabase._id,
    };

    // add valid items to order
    orderItems = [...orderItems, singleValidOrderItem];
    // calculate subtotal
    subtotal += item.amount * itemInDatabase.price;
  }

  // calculate total
  const total = req.body.tax + req.body.shippingFee + subtotal;

  const paymentIntent = await fakeStripAPI({ amount: total, currency: "usd" });

  const order = await Order.create({
    tax: req.body.tax,
    shippingFee: req.body.shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user!._id,
    clientSecret: paymentIntent.clientSecret,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

//------------------------------------------

export const getAllOrders: RequestHandler = async (_req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

//------------------------------------------

export const getSingleOrder: RequestHandler = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new NotFoundError(`No order with id : ${req.params.orderId}`);
  }
  checkAuthOrAdmin(req.user!, order.user);
  res.status(StatusCodes.OK).json({ order });
};

//------------------------------------------

export const getCurrentUserOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find({ user: req.user!._id });
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

//------------------------------------------

export const updateOrder: RequestHandler<
  IParamsDictionary,
  {},
  IUpdateOrderReqBody
> = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    // throw new NotFoundError(`No order with id : ${req.params.orderId}`);
    throw new NotFoundError(`No order found`);
  }

  checkAuthOrAdmin(req.user!, order.user);

  order.paymentIntentId = req.body.paymentIntent;
  order.status = "paid";

  res.status(StatusCodes.OK).json({ order });
};

//------------------------------------------
