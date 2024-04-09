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
  paymentId: string;
}

export enum EnumStatus {
  PENDING = "pending",
  FAILED = "failed",
  PAID = "paid",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}
