"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Question" }],
});
const Subject = mongoose_1.default.model("Subject", subjectSchema);
exports.default = Subject;
