import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const sendEmail: RequestHandler = (req, res, next) => {
  res.send("Sending email");
};

export { sendEmail };
