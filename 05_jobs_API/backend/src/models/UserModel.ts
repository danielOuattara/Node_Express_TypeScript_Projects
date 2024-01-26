// ---> Separate document interface definition
import brcypt from "bcryptjs";
import { Schema, model } from "mongoose";

interface InterfaceUser {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<InterfaceUser>({
  name: {
    type: String,
    required: [true, "Name is required. Please provide a name"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required. Please provide a name"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
});

UserSchema.pre("save", async function () {
  this.password = await brcypt.hash(this.password, 13);
});

export default model<InterfaceUser>("User", UserSchema);

//-------------------------------------------------------- OR

// // ---> Automatic type inference

// import { Schema, model, InferSchemaType } from "mongoose";
// import brcypt from "bcryptjs";

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required. Please provide a name"],
//     trim: true,
//     minLength: 2,
//     maxLength: 50,
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required. Please provide a name"],
//     match: [
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       "Please provide a valid email",
//     ],
//     unique: true,
//   },
//     password: {
//     type: String,
//     required: [true, "Please provide password"],
//     minLength: 6,
//   },
// });

// UserSchema.pre("save", async function () {
//   this.password = await brcypt.hash(this.password, 13);
// });

// type TypeUser = InferSchemaType<typeof UserSchema>

// export default model<TypeUser>("User", UserSchema)
