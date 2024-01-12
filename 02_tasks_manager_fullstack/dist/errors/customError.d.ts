declare class CustomAPIError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
declare const createCustomError: (errorMessage: string, errorStatusCode: number) => CustomAPIError;
export { createCustomError, CustomAPIError };
