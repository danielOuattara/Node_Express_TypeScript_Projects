import { Types } from "mongoose";
export interface IReview {
    rating: number;
    title: string;
    comment: string;
    user: Types.ObjectId;
    product: Types.ObjectId;
}
export interface ICreateReviewReqBody {
    product: Types.ObjectId;
    user: Types.ObjectId;
    title: string;
    rating: string;
    comment: string;
}
export interface IUpdateReviewReqBody {
    title: string;
    rating: string;
    comment: string;
}
export interface IParamsDictionary {
    reviewId: string;
}
