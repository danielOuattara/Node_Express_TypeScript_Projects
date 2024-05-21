/* Separate document interface definition 
--------------------------------------------*/

import { Schema, model, Model } from "mongoose";
import validator from "validator";
import { genSalt, hash, compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { Response } from "express";
import { IPayload, IUser, ROLE } from "../@types/user";

/** Create an interface 'IUser' representing a document in MongoDB */

/** Put all user instance methods in this 'IUserMethods':*/
interface IUserMethods {
  verifyPassword(pwd: string): Promise<boolean>;
  createJWT(payload: IPayload): string;
  attachCookiesToResponse(res: Response): Response;
}

/** Create a new Model type that knows about IUserMethods... */
// type UserModel = Model<IUser, {}, IUserMethods>;

/**
 * Above is commented because of below.
 * Create UserModel this way to further add static method
 * */
interface UserModel extends Model<IUser, {}, IUserMethods> {
  destroyCookiesInResponse(res: Response): Response;
}

/** Create a Schema corresponding to the document interface. */
const schema = new Schema<IUser, UserModel, IUserMethods>({
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
    required: [true, "Please provide password. Minimum of 6 characters"],
    minLength: 6,
  },

  role: {
    type: String,
    enum: {
      values: Object.values(ROLE),
      default: ROLE.user,
      message: "{VALUE} is not a valid value for ROLE position",
    },
  },
  verificationToken: {
    type: String,
  },
  emailIsVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationDate: {
    type: Date,
  },
});

//---
schema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(11);
  this.password = await hash(this.password, salt);
});

//---
schema.methods.verifyPassword = async function (password: string) {
  return await compare(password, this.password);
};

//---
schema.methods.createJWT = function (payload: IPayload) {
  return sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });
};

//---
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

//---
schema.static("destroyCookiesInResponse", function (res: Response) {
  return res.cookie("access_token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
});

/** Create a Model. */
const User_v1 = model<IUser, UserModel>("User", schema);

export default User_v1;

//---------------------------------------------------------------------------------------------------------------------
