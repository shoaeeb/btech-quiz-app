import CustomAPIError from "./Custom-API-Error";

class UnAuthorizedError extends CustomAPIError {
  statusCode: number = 401;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnAuthorizedError;
