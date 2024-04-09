import CustomAPIError from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
