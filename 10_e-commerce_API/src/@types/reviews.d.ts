import { Types } from "mongoose";

interface IReview {
  rating: string;
  title: string;
  comment: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
}

interface ICreateReviewReqBody {
  product: Types.ObjectId;
  user: Types.ObjectId;
}

interface IUpdateReviewReqBody {
  title: string;
  rating: string;
  comment: string;
}

interface IParamsDictionary {
  reviewId: string;
}
