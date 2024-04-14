"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    subjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
});
const Department = mongoose_1.default.model("Department", departmentSchema);
exports.default = Department;
