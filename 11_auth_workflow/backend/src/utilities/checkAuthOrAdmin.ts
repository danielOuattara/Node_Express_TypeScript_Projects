import { Types } from "mongoose";
import { MongooseUser } from "../@types/user";
import { UnauthorizedError } from "../errors";

export const checkAuthOrAdmin = (
  requestUser: MongooseUser,
  resourceUserId: Types.ObjectId,
) => {
  if (requestUser!.role === "admin") return;
  if (requestUser!._id.equals(resourceUserId)) return;
  throw new UnauthorizedError("Access denied");
};
