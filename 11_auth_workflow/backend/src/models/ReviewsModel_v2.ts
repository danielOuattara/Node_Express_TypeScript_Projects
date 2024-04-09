/**
 *  Automatic type inference
 * --------------------------- */

import { InferSchemaType, Model, model, Schema, Types } from "mongoose";
import { IReview } from "../@types/reviews";

interface IAggregateResult {
  _id: Types.ObjectId;
  averageRating: number;
  numberOfReviews: number;
}

/* Create a Schema corresponding to the document interface */
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
  {
    statics: {
      async calculateAverageRating(productId: Types.ObjectId): Promise<void> {
        try {
          const results: IAggregateResult[] = await this.aggregate([
            { $match: { product: productId } },
            {
              $group: {
                _id: "$product",
                averageRating: {
                  $avg: "$rating",
                },
                numberOfReviews: {
                  $sum: 1,
                },
              },
            },
          ]);

          await model("Product").findOneAndUpdate(
            { _id: productId },
            {
              averageRating: results[0]?.averageRating.toFixed(1) || 0, // Remove optional chaining as we ensure results[0] exists
              numberOfReviews: results[0]?.numberOfReviews || 0,
            },
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
    timestamps: true,
  },
);

/* Only One review by user and by product: compound index between product and user */
schema.index({ product: 1, user: 1 }, { unique: true });

/* Create the User by inferring the schema */
type TReview = InferSchemaType<typeof schema>;

interface IReviewModel extends Model<IReview> {
  calculateAverageRating(id: Types.ObjectId): Promise<void>; // Updated method signature
}

schema.post("save", async function () {
  await (this.constructor as IReviewModel).calculateAverageRating(this.product);
});

schema.post("deleteOne", { document: true, query: false }, async function () {
  await (this.constructor as IReviewModel).calculateAverageRating(this.product);
});

/* Create a model  */
const Model_v2 = model<TReview, IReviewModel>("Review", schema);

export default Model_v2;
