"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.passwordReset = exports.logout = exports.login = void 0;
const asyncWrapper_1 = __importDefault(require("../asyncWrapper"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../errors");
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const OTPHolder_1 = __importDefault(require("../models/OTPHolder"));
exports.login = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((error) => {
                return (error === null || error === void 0 ? void 0 : error.path) + " " + error.msg + "\n";
            }),
        });
        return;
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError("Invalid Credetentials");
    }
    const isPasswordCorrect = bcryptjs_1.default.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        throw new errors_1.BadRequestError("Invalid Credential");
    }
    const token = user.generateToken();
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({ message: "User Signed In Succesfully" });
}));
exports.logout = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("auth_token", "", { expires: new Date(0) });
    res.status(200).json({ message: "User Signed Out Succesfully" });
}));
exports.passwordReset = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((error) => {
                return (error === null || error === void 0 ? void 0 : error.path) + " " + error.msg + "\n";
            }),
        });
        return;
    }
    const otp = (0, utils_1.generateOtp)();
    yield OTPHolder_1.default.deleteOne({ email });
    yield OTPHolder_1.default.create({ email, otp });
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Password Reset",
        text: `Your OTP is ${otp}`,
    };
    utils_1.transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            next(error);
        }
        else {
            res.status(200).json({ message: "OTP Sent Succesfully" });
        }
    });
}));
exports.verifyOtp = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email, password } = req.body;
    console.log(password);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((error) => {
                return (error === null || error === void 0 ? void 0 : error.path) + " " + error.msg + "\n";
            }),
        });
        return;
    }
    const otpHolder = yield OTPHolder_1.default.findOne({
        email,
        otp,
    });
    if (!otpHolder) {
        throw new errors_1.BadRequestError("Invalid OTP");
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError("User Not Found");
    }
    user.password = password;
    yield user.save();
    yield OTPHolder_1.default.deleteOne({ email, otp });
    res.status(200).json({ message: "Password Reset Succesfully" });
}));
