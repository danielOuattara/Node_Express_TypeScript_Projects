import { RequestHandler } from "express";
import { ICreateReviewReqBody, IParamsDictionary, IUpdateReviewReqBody } from "../@types/reviews";
export declare const createReview: RequestHandler<{}, {}, ICreateReviewReqBody>;
export declare const getAllReviews: RequestHandler;
export declare const getSingleReview: RequestHandler;
export declare const updateReview: RequestHandler<IParamsDictionary, {}, IUpdateReviewReqBody>;
export declare const deleteReview: RequestHandler;
export declare const getSingleProductReviews: RequestHandler;
