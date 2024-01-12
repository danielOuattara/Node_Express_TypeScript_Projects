"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = exports.createCustomError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
const createCustomError = (errorMessage, errorStatusCode) => {
    return new CustomAPIError(errorMessage, errorStatusCode);
};
exports.createCustomError = createCustomError;
