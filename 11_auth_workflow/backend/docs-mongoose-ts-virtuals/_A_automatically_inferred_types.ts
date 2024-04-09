/**
 * Virtuals in TypeScript
 *
 * Virtuals are computed properties: you can access virtuals
 * on hydrated Mongoose documents, but virtuals are not stored
 * in MongoDB.
 *
 * Mongoose supports auto typed virtuals so you don't need to
 * define additional typescript interface anymore but you are
 * still able to do so.
 */

//--------------------------------------------------------------

/**
 * Automatically Inferred Types
 *
 * To make mongoose able to infer virtuals type, You have to define
 * them in schema constructor as following:
 */

import { Schema, Model, model, InferSchemaType } from "mongoose";

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName} `;
        },
        set(v: string) {
          // `v` is the value being set, so use the value to set `firstName` and `lastName`.
          const firstName = v.substring(0, v.indexOf(" "));
          const lastName = v.substring(v.indexOf(" ") + 1);
          this.set({ firstName, lastName });
        },
      },

      domain: {
        get() {
          return this.email.slice(this.email.indexOf("@") + 1);
        },
      },
    },
  },
);

/* 
Note that Mongoose does not include virtuals in the returned 
type from `InferSchemaType`. That is because `InferSchemaType` 
returns the "raw" document interface, which represents the 
structure of the data stored in MongoDB. */

type TUser = InferSchemaType<typeof schema>;

const user: TUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john_d@email.com",
};

// user.fullName; // Property 'fullName' does not exist on type '{ firstName: string; lastName: string; email: string; }'.ts(2339)

//-------------------------------------------------------------

/* 
However, Mongoose does add the virtuals to the model type. */

const UserModel = model("User", schema);

const user2 = new UserModel({
  firstName: "Anna",
  lastName: "Doe",
  email: "anna_d@email.com",
});

user2.fullName; // OK

// Here's how to get the hydrated document type
type UserDocument = ReturnType<(typeof UserModel)["hydrate"]>;
