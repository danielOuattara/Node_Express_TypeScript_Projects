// class CustomAPIError extends Error {
//   statusCode: number;
//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// export default CustomAPIError;

//--------------------------------------------------------------

class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default CustomAPIError;
