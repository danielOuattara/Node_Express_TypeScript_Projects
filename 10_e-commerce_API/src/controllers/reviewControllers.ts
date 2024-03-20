import { RequestHandler } from "express";
import Review from "./../models/ReviewsModel";
import Product from "./../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { ICreateReviewReqBody } from "../@types/reviews";
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

export const getAllReviews: RequestHandler = async (_req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

//----------------------------------------------------------------

export const getSingleReview: RequestHandler = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new BadRequestError(
      `No product found with ID: ${req.params.reviewId}`,
    );
  }

  res.status(StatusCodes.OK).json({ review });
};

//----------------------------------------------------------------

export const updateReview: RequestHandler = (_req, res) => {
  res.send("updateReview");
};

//----------------------------------------------------------------

export const deleteReview: RequestHandler = (_req, res) => {
  res.send("deleteReview");
};

//----------------------------------------------------------------
