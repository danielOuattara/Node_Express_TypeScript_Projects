/**
Populate with TypeScript
-------------------------
An alternative approach is to define a PopulatedParent interface 
and use Pick<> to pull the properties you're populating. */

import { Schema, model, Types } from "mongoose";

// `Parent` represents the object as it is stored in MongoDB
interface Parent {
  child?: Types.ObjectId;
  name?: string;
}

interface Child {
  name: string;
}

interface PopulatedParent {
  child: Child | null;
}

const ParentModel = model<Parent>(
  "Parent",
  new Schema({
    child: { type: Schema.Types.ObjectId, ref: "Child" },
    name: String,
  }),
);
const childSchema: Schema = new Schema({ name: String });
const ChildModel = model<Child>("Child", childSchema);

// Populate with `Paths` generic `{ child: Child }` to override `child` path
ParentModel.findOne({})
  .populate<Pick<PopulatedParent, "child">>("child")
  .orFail()
  .then((doc) => {
    // Works
    const t = doc.child?.name;
  });
