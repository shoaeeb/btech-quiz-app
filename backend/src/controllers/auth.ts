import asyncWrapper from "../asyncWrapper";
import { Request, Response, NextFunction, response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors";
import { validationResult } from "express-validator";
import { generateOtp, transport } from "../utils";
import { SentMessageInfo } from "nodemailer";
import OTPHolder from "../models/OTPHolder";

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array().map((error: any) => {
          return error?.path + " " + error.msg + "\n";
        }),
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid Credetentials");
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestError("Invalid Credential");
    }
    const token = user.generateToken();
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({ message: "User Signed In Succesfully" });
  }
);

export const logout = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("auth_token", "", { expires: new Date(0) });
    res.status(200).json({ message: "User Signed Out Succesfully" });
  }
);

export const passwordReset = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array().map((error: any) => {
          return error?.path + " " + error.msg + "\n";
        }),
      });
      return;
    }

    const otp = generateOtp();
    await OTPHolder.deleteOne({ email });
    await OTPHolder.create({ email, otp });
    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Password Reset",
      text: `Your OTP is ${otp}`,
    };

    transport.sendMail(
      mailOptions,
      (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          next(error);
        } else {
          res.status(200).json({ message: "OTP Sent Succesfully" });
        }
      }
    );
  }
);

export const verifyOtp = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { otp, email, password } = req.body;
    console.log(password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array().map((error: any) => {
          return error?.path + " " + error.msg + "\n";
        }),
      });
      return;
    }

    const otpHolder = await OTPHolder.findOne({
      email,
      otp,
    });
    if (!otpHolder) {
      throw new BadRequestError("Invalid OTP");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("User Not Found");
    }
    user.password = password;
    await user.save();
    await OTPHolder.deleteOne({ email, otp });
    res.status(200).json({ message: "Password Reset Succesfully" });
  }
);
