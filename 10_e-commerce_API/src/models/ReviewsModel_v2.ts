/* Automatic type inference
---------------------------- */

import { InferSchemaType, Model, model, Schema, Types } from "mongoose";
import { IReview } from "../@types/reviews";
import Product from "./ProductModel";

interface IAggregateResult {
  _id: Types.ObjectId;
  averageRating: number;
  numberOfReviews: number;
}

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

interface IReviewModel extends Model<IReview> {
  calculateAverageRating(): Promise<void>; // Updated method signature
}
/** Create a static method: calculateAverageRating, by using a function expression
 */

// schema.static(
//   "calculateAverageRating",
//   async function (productId: Types.ObjectId): Promise<void> {
//     console.log("calculate Average Rating");
//     const results: IAggregateResult[] = await this.aggregate([
//       { $match: { product: productId } },
//       {
//         $group: {
//           _id: "$product",
//           averageRating: { $avg: "$rating" },
//           numberOfReviews: { $sum: 1 },
//         },
//       },
//     ]);

//     console.log("results = ", results);
//   },
// );

schema.static(
  "calculateAverageRating",
  async function (productId: Types.ObjectId): Promise<void> {
    try {
      const results: IAggregateResult[] = await Model_v2.aggregate([
        { $match: { product: productId } },
        {
          $group: {
            _id: "$product",
            averageRating: { $avg: "$rating" },
            numberOfReviews: { $sum: 1 },
          },
        },
      ]);

      console.log("results = ", results);
      if (results.length > 0) {
        // Check if results array is not empty
        await Product.findOneAndUpdate(
          { _id: productId },
          {
            averageRating: results[0].averageRating.toFixed(1), // Remove optional chaining as we ensure results[0] exists
            numberOfReviews: results[0].numberOfReviews,
          },
        );
      } else {
        console.log("No reviews found for product:", productId);
      }
    } catch (error) {
      console.log(error);
    }
  },
);

schema.post("save", async function () {
  // await (this.constructor as IReviewModel).calculateAverageRating();
  await Model_v2.calculateAverageRating();
});

schema.post("deleteOne", { document: true, query: false }, async function () {
  // await (this.constructor as IReviewModel).calculateAverageRating();
  await Model_v2.calculateAverageRating();
});

/** Create a model */
const Model_v2 = model<TReview, IReviewModel>("Review", schema);

export default Model_v2;
