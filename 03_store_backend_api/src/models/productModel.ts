/* Separate document interface definition 
------------------------------------------  */

// import { Schema, model } from "mongoose";

// interface ProductInterface {
//   name: string;
//   completed: Boolean;
//   price: Number;
//   featured: Boolean;
//   rating: Number;
//   company: String;
//   createdAt: Date;
// }

// const ProductSchema = new Schema<ProductInterface>(
//   {
//     name: {
//       type: String,
//       required: [true, "product name must be provided"],
//       trim: true,
//       maxlength: [50, "Max length 50 chars"],
//     },

//     price: {
//       type: Number,
//       required: [true, "price must be provided"],
//     },

//     featured: {
//       type: Boolean,
//       default: false,
//     },

//     rating: {
//       type: Number,
//       default: 4.5,
//     },

//     company: {
//       type: String,
//       enum: {
//         values: ["ikea", "liddy", "caressa", "marcos"],
//         message: "{VALUE} is not supported",
//       },
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now(),
//     },
//   },
//   { timestamps: true },
// );

// const Product = model<ProductInterface>("Product", ProductSchema);
// export default Product;

//----------------------------------------------------------------------- OR
/* Automatic type inference 
------------------------------ */

import { Schema, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name must be provided"],
      trim: true,
      maxlength: [50, "Max length 50 chars"],
    },
    price: {
      type: Number,
      required: [true, "price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

type T_Product = InferSchemaType<typeof ProductSchema>;

const Product = model<T_Product>("Product", ProductSchema);

export default Product;
