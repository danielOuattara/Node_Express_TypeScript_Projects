import { sendEmail } from "./sendEmail";

interface ISendResetPasswordEmail {
  name: string;
  email: string;
  passwordToken: string;
  origin: string;
}

export const sendResetPasswordEmail = async ({
  name,
  email,
  origin,
  passwordToken,
}: ISendResetPasswordEmail) => {
  const resetPasswordLink = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;

  const message = `<p>To reset your password <a href="${resetPasswordLink}">click here</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4> Hello ${name}</h4> ${message} `,
  });
};
