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

  const message = `<p>Please confirm your email: <a href="${verifyEmailLink}" target="_blank">click here</a> </p>`;

  return await sendEmail({
    from: `"Admin" <ricatti@gmx.fr>`,
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello ${name}</h4> 
    ${message}`,
  });
};
