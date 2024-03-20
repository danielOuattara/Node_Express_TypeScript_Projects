import { Types } from "mongoose";

interface IReview {
  rating: string;
  title: string;
  comment: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
}
