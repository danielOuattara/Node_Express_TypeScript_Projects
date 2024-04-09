import { Types } from "mongoose";

export interface ISingleOrderItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: Types.ObjectId;
}

export interface IOrder {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItems: [];
  status: string;
  user: Types.ObjectId;
  clientSecret: string;
  paymentIntentId: string;
}

export enum EnumStatus {
  PENDING = "pending",
  FAILED = "failed",
  PAID = "paid",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export interface IReqCreateOrder {
  tax: number;
  shippingFee: number;
  cartItems: ISingleOrderItem[];
}

export interface IUpdateOrderReqBody {
  paymentIntent: string;
}
export interface IParamsDictionary {
  orderId: string;
}
