import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../asyncWrapper";
import Result from "../models/Result";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createResult = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const obj = req.body;
    const result = new Result({
      ...obj,
      attemptedBy: req.userId,
    });
    await result.save();
    res.status(201).json({ result });
  }
);
