/** 
Populate with TypeScript
-------------------------
Using PopulatedDoc

Mongoose also exports a PopulatedDoc type that helps you define 
populated documents in your document interface:   */

import { Schema, model, Document, PopulatedDoc, ObjectId } from "mongoose";

// `child` is either an ObjectId or a populated document
interface Parent {
  child?: PopulatedDoc<Document<ObjectId> & Child>;
  name?: string;
}
const ParentModel = model<Parent>(
  "Parent",
  new Schema({
    child: { type: "ObjectId", ref: "Child" },
    name: String,
  }),
);

interface Child {
  name?: string;
}
const childSchema: Schema = new Schema({ name: String });
const ChildModel = model<Child>("Child", childSchema);

ParentModel.findOne({})
  .populate("child")
  .orFail()
  .then((doc: Parent) => {
    const child = doc.child;
    if (child == null || child instanceof ObjectId) {
      throw new Error("should be populated");
    } else {
      // Works
      doc.child.name.trim();
    }
  });

/*

However, we recommend using the .populate<{ child: Child }> syntax 
from the first section instead of PopulatedDoc. Here's two reasons why:

  - You still need to add an extra check to check if child instanceof ObjectId. 
    Otherwise, the TypeScript compiler will fail with Property name does not 
    exist on type ObjectId. So using PopulatedDoc<> means you need an extra check 
    everywhere you use doc.child.
  
  - In the Parent interface, child is a hydrated document, which makes it slow 
    difficult for Mongoose to infer the type of child when you use lean() or 
    toObject().
*/
