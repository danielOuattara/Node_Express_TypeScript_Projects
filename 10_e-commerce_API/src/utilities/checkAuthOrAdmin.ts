import { MongooseUser } from "../custom";
import { UnauthenticatedError } from "../errors";

export const checkAuthOrAdmin = (
  requestUser: MongooseUser,
  resourceUserId = "",
) => {
  if (requestUser!.role === "admin") return;
  if (requestUser!._id?.toString() === resourceUserId.toString()) return;

  throw new UnauthenticatedError("Access denied");
};
