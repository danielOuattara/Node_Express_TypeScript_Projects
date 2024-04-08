/**
 * Override the Type of this in Your Virtual
 *
 * In case the value of `this` in your virtual is incorrect
 * for some reason, you can always override it, using the
 * generic parameter in the virtual() function.
 */

import { Schema, Model, model } from "mongoose";

interface IUserDoc {
  firstName: String;
  lastName: String;
  email: String;
  myMethod(): string;
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

schema.virtual<IUserDoc>("fullName").get(function () {
  return this.myMethod(); // returns string
});

const UserModel = model("User", schema);

const user = new UserModel({
  firstName: "John",
  lastName: "Doe",
  email: "john_d@email.com",
});

user.fullName; // OK!
user.domain; // OK
