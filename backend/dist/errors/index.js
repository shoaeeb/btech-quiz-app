"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = exports.BadRequestError = exports.CustomAPIError = void 0;
const Custom_API_Error_1 = __importDefault(require("./Custom-API-Error"));
exports.CustomAPIError = Custom_API_Error_1.default;
const BadRequestError_1 = __importDefault(require("./BadRequestError"));
exports.BadRequestError = BadRequestError_1.default;
const UnAuthorizedError_1 = __importDefault(require("./UnAuthorizedError"));
exports.UnAuthorizedError = UnAuthorizedError_1.default;
