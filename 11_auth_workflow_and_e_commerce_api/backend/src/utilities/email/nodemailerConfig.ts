// export const nodemailerConfig = {
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: process.env.USER_ACCOUNT_ETHEREAL as string,
//     pass: process.env.PASS_ACCOUNT_ETHEREAL as string,
//   },
// };

export const nodemailerConfig = {
  host: process.env.HOST as string,
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL as string,
    pass: process.env.ADMIN_PSWD as string,
  },
};
