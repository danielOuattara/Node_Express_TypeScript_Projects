import CustomAPIError from "./custom-error";
import {
  StatusCodes,
  // ReasonPhrases,
  // getReasonPhrase,
  // getStatusCode,
} from "http-status-codes";

class BadRequest extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
