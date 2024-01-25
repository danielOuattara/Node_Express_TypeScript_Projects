import CustomAPIError from "../errors/custom-error";
declare class ServerError extends CustomAPIError {
    statusCode: number;
    constructor(message: string);
}
export default ServerError;
