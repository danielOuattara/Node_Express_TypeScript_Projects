import { RequestHandler } from "express";
import Review from "./../models/ReviewsModel";
import Product from "./../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import {
  ICreateReviewReqBody,
  IParamsDictionary,
  IUpdateReviewReqBody,
} from "../@types/reviews";
import { checkAuthOrAdmin } from "../utilities";
import { IProduct } from "../@types/product";
import { IUser } from "../@types/user";
//----------------------------------------------------------------

export const createReview: RequestHandler<
  {},
  {},
  ICreateReviewReqBody
> = async (req, res) => {
  const product = await Product.findById(req.body.product);
  if (!product) {
    throw new NotFoundError("Product unknown");
  }

  const alreadySubmittedReview = await Review.findOne({
    product: req.body.product,
    user: req.user!._id,
  });
  if (alreadySubmittedReview) {
    throw new BadRequestError(
      `Cannot create a new review on this product. But you can update your old review `,
    );
  }

  req.body.user = req.user!._id;

  const review = await Review.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "review successfully created", review });
};

//----------------------------------------------------------------

/* OK */

// export const getAllReviews: RequestHandler = async (_req, res) => {
//   const reviews = await Review.find({})
//     .populate({
//       path: "product",
//       select: "name company category image price description",
//     })
//     .populate({
//       path: "user",
//       select: "_id name",
//     });
//   res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
// };

export const getAllReviews: RequestHandler = async (_req, res) => {
  const reviews = await Review.find({})
    .populate<{ product: IProduct }>({
      path: "product",
      select: "name company category image price description",
    })
    .populate<{ user: IUser }>({
      path: "user",
      select: "_id name",
    });
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

//----------------------------------------------------------------

export const getSingleReview: RequestHandler = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new BadRequestError(`No review with ID: ${req.params.reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

//----------------------------------------------------------------

export const updateReview: RequestHandler<
  IParamsDictionary,
  {},
  IUpdateReviewReqBody
> = async (req, res) => {
  if (!req.body.title || !req.body.rating || !req.body.comment) {
    throw new BadRequestError(`title, rating & comment fields are required`);
  }

  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new NotFoundError(`review unknown`);
  }

  checkAuthOrAdmin(req.user!, review.user);

  review.title = req.body.title;
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json({ message: "update review successfully", review });
};

//----------------------------------------------------------------

export const deleteReview: RequestHandler = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new BadRequestError(`No review with ID: ${req.params.reviewId}`);
  }
  checkAuthOrAdmin(req.user!, review.user._id);
  await review.deleteOne();
  res.json({ message: "delete review" });
};

//----------------------------------------------------------------

export const getSingleProductReviews: RequestHandler = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate({
      path: "product",
      select: "name company category image price description",
    })
    .populate({
      path: "user",
      select: "_id name",
    });

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};
