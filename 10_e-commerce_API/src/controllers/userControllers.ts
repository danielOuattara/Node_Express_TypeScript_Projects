import { RequestHandler } from "express";
import User from "./../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";

export const getAllUsers: RequestHandler = async (req, res) => {
  res.send("getAllUser");
};
export const getSingleUser: RequestHandler = async (req, res) => {
  res.send("getSingleUser");
};
export const showCurrentUser: RequestHandler = async (req, res) => {
  res.send("showCurrentUser");
};
export const updateUser: RequestHandler = async (req, res) => {
  res.send("updateUser");
};
export const updateUserPassword: RequestHandler = async (req, res) => {
  res.send("updateUserPAssword");
};
