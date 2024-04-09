/** Separate document interface definition 
--------------------------------------------*/

import { Model, Schema, model } from "mongoose";
import { IReview } from "../@types/reviews";
import { IProduct, EnumCategory, EnumCompany } from "../@types/product";

/** Create a Schema corresponding to the document interface 'IProduct'. */
interface IProductVirtuals {
  reviews: IReview;
}

type TypeProductModel = Model<IProduct, {}, {}, IProductVirtuals>;

const schema = new Schema<IProduct, TypeProductModel, IProductVirtuals>(
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, // remove deduplicated `id` in response
  },
);

//-----------------
schema.virtual("reviews", {
  ref: "Review", // ref to the Model name
  localField: "_id", // a connection btw. the two models
  foreignField: "product", // the field in the ref above
  justOne: false, // to get a list
  // match: { rating: 2 }, // match docs where rating = 2
  // match: { rating: 5 }, // match docs where rating = 5
});

schema.virtual("reviewsCount", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  count: true,
});

//------------
schema.pre("deleteOne", { document: true, query: false }, async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

/** Create a model */
const Product_v1 = model<IProduct>("Product", schema);

export default Product_v1;
