export const nodemailerConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.USER_ACCOUNT_ETHEREAL as string,
    pass: process.env.PASS_ACCOUNT_ETHEREAL as string,
  },
};
