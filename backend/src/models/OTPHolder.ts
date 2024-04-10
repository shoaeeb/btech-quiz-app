import mongoose, { mongo } from "mongoose";
import { defaultMaxListeners } from "nodemailer/lib/xoauth2";

const otpHolderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const OTPHolder = mongoose.model("otpHolder", otpHolderSchema);
export default OTPHolder;
