import { RequestHandler } from "express";

//----------------------------------------------------------------

export const createReview: RequestHandler = (_req, res) => {
  res.send("createReview");
};

//----------------------------------------------------------------

export const getAllReviews: RequestHandler = (_req, res) => {
  res.send("getAllReviews");
};

//----------------------------------------------------------------

export const getSingleReview: RequestHandler = (_req, res) => {
  res.send("getSingleReview");
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
