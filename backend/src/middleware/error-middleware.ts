import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/Custom-API-Error";

interface ErrorWithStatusCode extends Error {
  statusCode: number;
}

const errorMiddleware = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
  };
  if (err && err instanceof CustomAPIError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  console.log(err);
  res.status(customError.statusCode).json({ errors: customError.message });
};

export default errorMiddleware;
