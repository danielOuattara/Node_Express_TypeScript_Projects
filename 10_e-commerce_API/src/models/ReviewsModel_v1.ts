// /**
//  *  Separate document interface definition
//  * -------------------------------------------*/

import { Model, Schema, model } from "mongoose";
import { IReview } from "../@types/reviews";

// Interface representing instance methods of the review model
interface IReviewModel extends Model<IReview> {
  calculateAverageRating(): Promise<void>; // Updated method signature
}

// Define the schema for the review document and include instance methods
const schema = new Schema<IReview, IReviewModel>(
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

/** Only One review by user and by product:
 *  compound index between product and user
 */
schema.index({ product: 1, user: 1 }, { unique: true });

/**
 * Create a static method: calculateAverageRating, by using a function expression
 */
schema.static("calculateAverageRating", async function (): Promise<void> {
  console.log("calculate Average Rating");
});

schema.post<IReview>("save", async function () {
  await (this.constructor as IReviewModel).calculateAverageRating();
});

schema.post<IReview>("deleteOne", async function () {
  await (this.constructor as IReviewModel).calculateAverageRating();
});

// Create the model using the schema
const Model_v1 = model<IReview, IReviewModel>("Review", schema);

export default Model_v1;
