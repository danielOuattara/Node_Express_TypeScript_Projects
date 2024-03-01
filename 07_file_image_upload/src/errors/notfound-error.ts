import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default NotFoundError;