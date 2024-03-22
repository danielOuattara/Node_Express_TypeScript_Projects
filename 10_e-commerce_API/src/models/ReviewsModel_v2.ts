/* Automatic type inference
---------------------------- */

import { InferSchemaType, model, Schema } from "mongoose";

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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

/** Only One review by user and by product: compound index between product and user */
schema.index({ product: 1, user: 1 }, { unique: true });

/** Create the User by inferring the schema */
type TReview = InferSchemaType<typeof schema>;

/** Create a model */
const Model_v2 = model<TReview>("Review", schema);

export default Model_v2;
