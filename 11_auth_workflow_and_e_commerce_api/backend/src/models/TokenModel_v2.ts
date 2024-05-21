/* Separate document interface definition 
--------------------------------------------*/

import { Schema, model, InferSchemaType } from "mongoose";

const schema = new Schema(
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
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/** Create the Token by inferring the schema */
type TToken = InferSchemaType<typeof schema>;

const Token_v2 = model<TToken>("Token", schema);

export default Token_v2;
