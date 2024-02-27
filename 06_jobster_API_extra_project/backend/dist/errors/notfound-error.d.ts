import CustomAPIError from "./custom-error";
declare class NotFoundError extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default NotFoundError;
