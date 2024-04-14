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
exports.getSubjectByDepartmentId = void 0;
const asyncWrapper_1 = __importDefault(require("../asyncWrapper"));
const Department_1 = __importDefault(require("../models/Department"));
exports.getSubjectByDepartmentId = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentId = req.params.departmentId;
    console.log(departmentId);
    const department = yield Department_1.default.findOne({
        _id: departmentId,
    }).populate("subjects");
    if (!department) {
        res.status(404).json({ message: "Department not found" });
        return; // Add return statement to exit the function
    }
    res.status(200).json(department.subjects);
}));
