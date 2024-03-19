interface IReqBody {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
}

declare module "express-async-errors";
