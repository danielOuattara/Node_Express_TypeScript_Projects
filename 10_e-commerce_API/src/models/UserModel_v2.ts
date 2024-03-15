/* Automatic type inference
---------------------------- */

import { Schema, InferSchemaType, model, Types, Model } from "mongoose";
import validator from "validator";
import { genSalt, hash, compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { Response } from "express";

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

//---
schema.pre("save", async function () {
  // console.log(this.modifiedPaths()); // --> an array of strings like: [ "name", email]
  // console.log(this.isModified("name")); //  --> boolean
  if (this.isModified("password")) {
    const salt = await genSalt(11);
    this.password = await hash(this.password, salt);
  } else {
    return;
  }
});

//---
schema.methods.verifyPassword = async function (password: string) {
  const isValid = await compare(password, this.password);
  return isValid;
};

schema.methods.createJWT = function (payload: IPayload) {
  return sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });
};

schema.methods.attachCookiesToResponse = function (res: Response) {
  const payload: IPayload = {
    name: this.name,
    userId: this._id,
    role: this.role,
  };

  const token = this.createJWT(payload);

  return res.cookie("access_token", "Bearer " + token, {
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

schema.static("destroyCookiesInResponse", function (res: Response) {
  return res.cookie("access_token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
});

//---

interface IPayload {
  name: string;
  userId: Types.ObjectId;
  role: string;
}

/* Create the User by inferring the schema */
type TUser = InferSchemaType<typeof schema>;

/* Put all user instance methods in this interface:*/
interface IUserMethods {
  verifyPassword(pwd: string): Promise<boolean>;
  createJWT(payload: IPayload): string;
  attachCookiesToResponse(res: Response): Response;
}

// Create a new Model type that knows about IUserMethods...
// type UserModel = Model<TUser, {}, IUserMethods>;

interface UserModel extends Model<TUser, {}, IUserMethods> {
  destroyCookiesInResponse(res: Response): Response;
}

/* create a Model */
const User_v2 = model<TUser, UserModel>("User", schema);

// export the User model
export default User_v2;
