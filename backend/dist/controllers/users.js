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
exports.getUser = exports.validateToken = exports.signUp = void 0;
const asyncWrapper_1 = __importDefault(require("../asyncWrapper"));
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
exports.signUp = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((error) => {
                return (error === null || error === void 0 ? void 0 : error.path) + " " + error.msg + "\n";
            }),
        });
        return;
    }
    const { name, email, password } = req.body;
    let user = new User_1.default({ name, email, password });
    user = yield user.save();
    const token = user.generateToken();
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, //1day
    });
    res.status(201).json({ message: "User Registered Succesfully" });
}));
exports.validateToken = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ userId: req.userId });
}));
exports.getUser = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ _id: req.userId }).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    console.log(user);
    res.status(200).json(user);
}));
