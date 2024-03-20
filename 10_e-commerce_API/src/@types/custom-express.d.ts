import { MongooseUser } from "./user";

declare module "express-serve-static-core" {
  interface Request {
    user?: MongooseUser;
  }
}
