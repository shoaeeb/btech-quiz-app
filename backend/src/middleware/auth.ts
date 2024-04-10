import asyncWrapper from "../asyncWrapper";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnAuthorizedError } from "../errors";
import { validationResult } from "express-validator";

export const verifyToken = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const token = req.cookies["auth_token"];
    if (!token) {
      throw new UnAuthorizedError("Unauthorized Access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const userId = (decoded as JwtPayload).userId;

    req.userId = userId;
    next();
  }
);
