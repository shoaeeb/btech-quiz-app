import asyncWrapper from "../asyncWrapper";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { validationResult } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const signUp = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array().map((error: any) => {
          return error?.path + " " + error.msg + "\n";
        }),
      });
      return;
    }

    const { name, email, password } = req.body;

    let user = new User({ name, email, password });
    user = await user.save();
    const token = user.generateToken();
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, //1day
    });
    res.status(201).json({ message: "User Registered Succesfully" });
  }
);

export const validateToken = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ userId: req.userId });
  }
);

export const getUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.userId }).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(user);
    res.status(200).json(user);
  }
);
