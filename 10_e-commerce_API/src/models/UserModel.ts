/* Separate document interface definition 
--------------------------------------------*/

// import { Schema, model, Model } from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";

// /* Create an interface representing a document in MongoDB */

// enum ROLE {
//   admin = "admin",
//   user = "user",
// }

// interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   role: ROLE;
// }

// /* Put all user instance methods in this interface:*/
// interface IUserMethods {
//   comparePassword(pwd: string): Promise<boolean>;
// }

// /* Create a new Model type that knows about IUserMethods... */
// type UserModel = Model<IUser, {}, IUserMethods>;

// /* Create a Schema corresponding to the document interface. */
// const schema = new Schema<IUser, UserModel, IUserMethods>({
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

// //---
// schema.pre("save", async function () {
//   // console.log(this.modifiedPaths()); // --> an array of strings like: [ "name", email]
//   // console.log(this.isModified("name")); //  --> boolean
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(11);
//     this.password = await bcrypt.hash(this.password, salt);
//   } else {
//     return;
//   }
// });

// //---
// schema.methods.comparePassword = async function (password: string) {
//   const isValid = await bcrypt.compare(password, this.password);
//   return isValid;
// };

// /* Create a Model. */
// const User = model<IUser, UserModel>("User", schema);

// export default User;

//-------------------------------------------------------------

/* Automatic type inference
---------------------------- */

import { Schema, InferSchemaType, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

enum ROLE {
  admin = "admin",
  user = "user",
}

/* Create a Schema. */
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
    enum: ROLE,
    default: ROLE.user,
  },
});

//----------------------------------------------------------------
schema.pre("save", async function () {
  // console.log(this.modifiedPaths()); // --> an array of strings like: [ "name", email]
  // console.log(this.isModified("name")); //  --> boolean
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    return;
  }
});

//---
schema.methods.comparePassword = async function (password: string) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

//----------------------------------------------------------------
/* Create the User by inferring the schema */
type TUser = InferSchemaType<typeof schema>;

/* create a Model */
const User = model<TUser>("User", schema);

// export the User model
export default User;
