import CustomAPIError from "./Custom-API-Error";

class BadRequestError extends CustomAPIError {
  statusCode: number = 400;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
