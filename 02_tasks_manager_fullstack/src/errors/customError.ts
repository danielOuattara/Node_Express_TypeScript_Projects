//------------------------------------------------------------
// A class generating a custom error object from external data

class CustomAPIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

//------------------------------------------------------------
// function that handles CutomAPIError instanciation

const createCustomError = (errorMessage: string, errorStatusCode: number) => {
  return new CustomAPIError(errorMessage, errorStatusCode);
};

export { createCustomError, CustomAPIError };
