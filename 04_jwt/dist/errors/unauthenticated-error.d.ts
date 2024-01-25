import CustomAPIError from "../errors/custom-error";
declare class UnauthenticatedError extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default UnauthenticatedError;
