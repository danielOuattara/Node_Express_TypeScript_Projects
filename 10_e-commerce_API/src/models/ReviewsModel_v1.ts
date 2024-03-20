/**
 *  Separate document interface definition
 * -------------------------------------------*/

import { model, Schema, Types } from "mongoose";
import { IReview } from "../@types/reviews";

/** Create a Schema corresponding to the document interface. */
const schema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a title"],
      maxLength: 100,
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Please provide a comment"],
      maxLength: [500, "Comment is max 500 characters"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

/** Only One review by user and by product: compound index between product and user */
schema.index({ product: 1, user: 1 }, { unique: true });

/** Create a model */
const Model_v1 = model<IReview>("Review", schema);

export default Model_v1;
