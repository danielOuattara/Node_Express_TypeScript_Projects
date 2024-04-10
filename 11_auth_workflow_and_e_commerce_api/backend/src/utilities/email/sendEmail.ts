import nodemailer from "nodemailer";
import { nodemailerConfig } from "./nodemailerConfig";
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async ({ from, to, subject, html }: Mail.Options) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({ from, to, subject, html });
};
