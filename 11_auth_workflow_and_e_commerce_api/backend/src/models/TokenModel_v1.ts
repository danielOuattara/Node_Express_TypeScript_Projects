/* Separate document interface definition 
--------------------------------------------*/

import { Schema, model } from "mongoose";
import { IToken } from "../@types/token";

const schema = new Schema<IToken>(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Token_v1 = model<IToken>("Token", schema);

export default Token_v1;
