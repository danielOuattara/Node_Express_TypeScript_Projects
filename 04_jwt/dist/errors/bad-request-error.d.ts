import CustomAPIError from "./custom-error";
declare class BadRequest extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default BadRequest;
