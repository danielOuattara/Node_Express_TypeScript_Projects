/* Separate document interface definition 
------------------------------------------ */

// import { Schema, model } from "mongoose";
// import validator from "validator";

// // 1. Create an interface representing a document in MongoDB

// enum ROLE {
//   admin = "ADMIN",
//   user = "USER",
// }

// interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   role: ROLE;
// }

// // 2. Create a Schema corresponding to the document interface.
// const schema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, "Name is required. Please provide a name"],
//     trim: true,
//     minLength: 2,
//     maxLength: 50,
//   },

//   email: {
//     type: String,
//     required: [true, "Email is required. Please provide a valid email"],
//     unique: true,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: "Email is required. Please provide a valid email",
//     },
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide password"],
//     minLength: 6,
//   },

//   role: {
//     type: String,
//     enum: ROLE,
//     default: ROLE.user,
//   },
// });

// // 3. Create a Model.
// const User = model<IUser>("User", schema);

// export default User;

//-------------------------------------------------------------

/* Automatic type inference
---------------------------- */

import { Schema, InferSchemaType, model } from "mongoose";
import validator from "validator";

// 1. Create a Schema.
const schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required. Please provide a name"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },

  email: {
    type: String,
    required: [true, "Email is required. Please provide a valid email"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Email is required. Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

type TUser = InferSchemaType<typeof schema>;

const User = model<TUser>("User", schema);

export default User;
