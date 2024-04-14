"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Custom_API_Error_1 = __importDefault(require("./Custom-API-Error"));
class UnAuthorizedError extends Custom_API_Error_1.default {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.statusCode = 401;
    }
}
exports.default = UnAuthorizedError;
