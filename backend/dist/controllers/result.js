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
exports.getResult = exports.createResult = void 0;
const asyncWrapper_1 = __importDefault(require("../asyncWrapper"));
const Result_1 = __importDefault(require("../models/Result"));
const Subject_1 = __importDefault(require("../models/Subject"));
exports.createResult = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = req.body;
    const result = new Result_1.default(Object.assign(Object.assign({}, obj), { attemptedBy: req.userId }));
    yield result.save();
    res.status(201).json({ result });
}));
exports.getResult = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentId = req.params.departmentId;
    const subjectId = req.params.subjectId;
    let results = yield Result_1.default.find({
        departmentId,
        subjectId,
    });
    const totalTimeTakenByAllStudents = results.reduce((acc, curr) => acc + curr.timeTaken, 0);
    const unattemptedQuestions = results.reduce((acc, curr) => acc + curr.unattempted, 0);
    const correctlyAnswered = results.reduce((acc, curr) => acc + curr.result.filter((res) => res.correctlyAnswered).length, 0);
    const subject = yield Subject_1.default.findOne({ _id: subjectId });
    const totalQuestions = (subject === null || subject === void 0 ? void 0 : subject.questions.length) || 0;
    let totalCandidates = results.filter((result) => result.attemptedBy.toString() !== req.userId).length;
    if (results.filter((result) => result.attemptedBy.toString() === req.userId)
        .length > 0) {
        totalCandidates += 1;
    }
    res.status(200).json({
        totalQuestions,
        totalTimeTakenByAllStudents,
        unattemptedQuestions,
        correctlyAnswered,
        totalCandidates,
    });
}));
