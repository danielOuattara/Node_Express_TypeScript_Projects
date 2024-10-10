import { sendEmail } from "./sendEmail";

interface ISendVerificationEmail {
  name: string;
  email: string;
  verificationToken: string;
  origin: string;
}

export const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}: ISendVerificationEmail) => {
  const verifyEmailLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<div>
  <p>Please confirm your email: <a href="${verifyEmailLink}" target="_blank">click here</a></p>
  <p>or follow this link <a href="${verifyEmailLink}">${verifyEmailLink}</a></p>
  </div>`;

  return await sendEmail({
    from: `"Admin" <${process.env.ADMIN_EMAIL as string}>`,
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello ${name}</h4> 
    ${message}`,
  });
};
