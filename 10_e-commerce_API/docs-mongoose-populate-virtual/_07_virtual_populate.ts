import { Model, Schema, model } from "mongoose";

/**
 * Populate
 * 
 * Mongoose also supports `populating virtuals`. A populated virtual 
 * contains documents from another collection. To define a populated 
 * virtual, you need to specify:
 * - The `ref` option, which tells Mongoose which model to populate 
 *   documents from.
 * 
 * - The `localField` and `foreignField` options. Mongoose will populate 
 *   documents from the model in ref whose foreignField matches this 
 *   document's localField.

 */

interface IUser {
  _id: number;
  email: string;
}

const userSchema = new Schema<IUser>({
  _id: Number,
  email: String,
});

const User = model<IUser>("User", userSchema);

//-------------

interface IBlogPost {
  title: string;
  authorId: number;
}

interface IBlogPostVirtuals {
  author: IUser;
}

type TBlogPostModel = Model<IBlogPost, {}, {}, IBlogPostVirtuals>;

const blogPostSchema = new Schema<IBlogPost, TBlogPostModel, IBlogPostVirtuals>(
  {
    title: String,
    authorId: Number,
  },
);

// When you `populate()` the `author` virtual, Mongoose will find the
// first document in the User model whose `_id` matches this document's
// `authorId` property.

blogPostSchema.virtual("author", {
  ref: "User",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
});

const BlogPost = model<IBlogPost>("BlogPost", blogPostSchema);

//----------------

await BlogPost.create({ title: "Introduction to Mongoose", authorId: 1 });

await User.create({ _id: 1, email: "test@gmail.com" });

const doc = await BlogPost.findOne().populate<{ author: IUser }>("author");

doc?.author.email; // 'test@gmail.com': string | undefined
