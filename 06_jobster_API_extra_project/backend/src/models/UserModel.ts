// ---> Separate document interface definition
// import { Schema, model, Model } from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   lastName: string;
//   location: string;
// }

// interface IUserMethods {
//   getName(): string;
//   createJWT(): string;
//   comparePassword(pwd: string): Promise<boolean>;
// }

// /* Create a new Model type that knows about IUserMethods... */
// type UserModel = Model<IUser, {}, IUserMethods>;

// /* And a schema that knows about IUserMethods */
// const schema = new Schema<IUser, UserModel, IUserMethods>({
//   name: {
//     type: String,
//     required: [true, "Name is required. Please provide a name"],
//     trim: true,
//     minLength: 2,
//     maxLength: 50,
//   },
//   lastName: {
//     type: String,
//     trim: true,
//     maxlength: 50,
//     default: "lastName",
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
//   password: {
//     type: String,
//     required: [true, "Please provide password"],
//     minLength: 6,
//   },
//   location: {
//     type: String,
//     trim: true,
//     maxlength: 20,
//     default: "my city",
//   },
// });

// //-------------------------------------------------------------------
// schema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 13);
// });

// //-------------------------------------------------------------------
// schema.methods.getName = function () {
//   return this.name;
// };

// //-------------------------------------------------------------------
// schema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name },
//     process.env.JWT_SECRET as string,
//     {
//       expiresIn: process.env.JWT_LIFETIME as string,
//     },
//   );
// };

// //-------------------------------------------------------------------
// schema.methods.comparePassword = function (password: string) {
//   return bcrypt.compare(password, this.password);
// };

// export default model<IUser, UserModel>("User", schema);

// ================================================================== OR

// ---> Automatic type inference

import { Schema, model, InferSchemaType, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required: please provide a name."],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  email: {
    type: String,
    required: [true, "Email is required: please provide an email."],
    match: [emailRegex, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required: please provide password."],
    minLength: 6,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});
//--------------------------------------
schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 13);
});

//--------------------------------------
schema.methods.getName = function () {
  return this.name;
};

//--------------------------------------
schema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME as string,
    },
  );
};

//----------------------------------------
schema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

type TUser = InferSchemaType<typeof schema>;

interface IUserMethods {
  getName(): string;
  createJWT(): string;
  comparePassword(pwd: string): Promise<boolean>;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<TUser, {}, IUserMethods>;

// And a schema that knows about IUserMethods

export default model<TUser, UserModel>("User", schema);
