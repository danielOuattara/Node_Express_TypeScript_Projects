import { RequestHandler } from "express";
import { ICreateReviewReqBody, IUpdateReviewReqBody } from "../@types/reviews";
export declare const createReview: RequestHandler<{}, {}, ICreateReviewReqBody>;
export declare const getAllReviews: RequestHandler;
export declare const getSingleReview: RequestHandler;
export declare const updateReview: RequestHandler<{}, {}, IUpdateReviewReqBody>;
export declare const deleteReview: RequestHandler;
