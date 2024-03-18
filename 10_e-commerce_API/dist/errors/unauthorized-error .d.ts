import CustomAPIError from "../errors/custom-error";
declare class UnauthorizedError extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default UnauthorizedError;
