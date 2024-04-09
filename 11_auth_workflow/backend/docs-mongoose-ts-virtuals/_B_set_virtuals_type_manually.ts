/**
 * Set virtuals type manually
 * 
 * You shouldn't define virtuals in your TypeScript document interface. 
 * Instead, you should define a separate interface for your virtuals, 
 * and pass this interface to Model and Schema.

 * For example, suppose you have a UserDoc interface, and you want to 
 * define a fullName virtual. Below is how you can define a separate 
 * UserVirtuals interface for fullName. 
 */

import { Schema, Model, model } from "mongoose";

interface IUserDoc {
  firstName: String;
  lastName: String;
  email: String;
}

interface IUserVirtuals {
  fullName: string;
  domain: string;
}

// add virtuals below...
// type TUserModel = Model<IUserDoc, {},  IUserVirtuals>;
// OR
type TUserModel = Model<IUserDoc, {}, {}, IUserVirtuals>;

const schema = new Schema<IUserDoc, TUserModel, IUserVirtuals>({
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
});

schema
  .virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName} `;
  })
  .set(function (v: string) {
    // `v` is the value being set, so use the value to set `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

schema.virtual("domain").get(function () {
  return this.email.slice(this.email.indexOf("@") + 1);
});

const UserModel = model("User", schema);

const user = new UserModel({
  firstName: "John",
  lastName: "Doe",
  email: "john_d@email.com",
});

user.fullName; // OK!
user.domain; // OK
