"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Custom_API_Error_1 = __importDefault(require("../errors/Custom-API-Error"));
const errorMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong",
    };
    if (err && err instanceof Custom_API_Error_1.default) {
        customError.message = err.message;
        customError.statusCode = err.statusCode;
    }
    console.log(err);
    res.status(customError.statusCode).json({ errors: customError.message });
};
exports.default = errorMiddleware;
