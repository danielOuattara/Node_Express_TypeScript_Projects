/* Separate document interface definition 
--------------------------------------------*/

import { Schema, model, Types } from "mongoose";
import { IProduct } from "../@types/product";

enum EnumCategory {
  OFFICE = "office",
  KITCHEN = "kitchen",
  BEDROOM = "bedroom",
}

enum EnumCompany {
  IKEA = "ikea",
  LIDDY = "liddy",
  MARCOS = "marcos",
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required !"],
      trim: true,
      minLength: 2,
      maxLength: [100, "Product name, max 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price value is required !"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Product description is required !"],
      maxLength: [1000, "Product description, is max 1,000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
      required: [true, "Product image is required !"],
    },
    category: {
      type: String,
      required: [true, "Product category is required !"],
      enum: {
        values: Object.values(EnumCategory),
        message: "{VALUE} is not supported as category name",
      },
    },
    company: {
      type: String,
      required: [true, "Company is required !"],
      enum: {
        values: Object.values(EnumCompany),
        message: "{VALUE} is not supported as company name",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: [true, "Product color is required !"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Inventory data is required !"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

schema.pre("deleteOne", { document: true, query: false }, async function () {});

/**
 * Create a model
 */
const Product_v1 = model<IProduct>("Product", schema);

export default Product_v1;
