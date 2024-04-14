"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResultSchema = new mongoose_1.default.Schema({
    attemptedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    departmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    subjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    result: [
        {
            correctlyAnswered: {
                type: Boolean,
                required: true,
            },
            question: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Question",
            },
            selectedAnswer: {
                type: String,
                required: true,
            },
        },
    ],
    timeTaken: {
        type: Number,
        required: true,
    },
    unattempted: {
        type: Number,
        required: true,
    },
});
const Result = mongoose_1.default.model("Result", ResultSchema);
exports.default = Result;
