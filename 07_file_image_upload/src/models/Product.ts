// ---> Separate document interface definition
import { Schema, model } from "mongoose";

interface I_Product {
  name: string;
  price: number;
  image: string;
}

const schema = new Schema<I_Product>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<I_Product>("Product", schema);

//========================================================= OR

// ---> Automatic type inference

// import { Schema, model, InferSchemaType } from "mongoose";

// const schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// type T_Products = InferSchemaType<typeof schema>;

// export default model<T_Products>("Product", schema);
