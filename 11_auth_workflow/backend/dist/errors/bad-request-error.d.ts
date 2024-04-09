import CustomAPIError from "./custom-error";
declare class BadRequestError extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default BadRequestError;
