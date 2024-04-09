/**
 *  Automatic type inference
 * --------------------------- */
import { InferSchemaType, model, Schema } from "mongoose";
import { EnumStatus, ISingleOrderItem } from "../@types/order";

const SingleOrderItemSchema = new Schema<ISingleOrderItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

//----------------------------------------------

const schema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      values: Object.values(EnumStatus),
      default: EnumStatus.PENDING,
      message: "{VALUE} is not supported as category name",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true },
);

type TOrder = InferSchemaType<typeof schema>;

const Order_v1 = model<TOrder>("Order", schema);

export default Order_v1;
