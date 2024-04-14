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
exports.getQuiz = exports.createQuiz = void 0;
const asyncWrapper_1 = __importDefault(require("../asyncWrapper"));
const Question_1 = __importDefault(require("../models/Question"));
const Subject_1 = __importDefault(require("../models/Subject"));
const Department_1 = __importDefault(require("../models/Department"));
const express_validator_1 = require("express-validator");
exports.createQuiz = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log("createQuiz");
    const { questions, department, subject } = req.body;
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors
                .array()
                .map((error) => error.msg + " " + error.path),
        });
        return;
    }
    let questionRef = questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
        let q = new Question_1.default({
            question: question.question,
            options: question.options,
            answer: question.answer,
            createdBy: req.userId,
        });
        yield q.save();
        return q;
    }));
    questionRef = yield Promise.all(questionRef);
    let subjects;
    let existingSubject = yield Subject_1.default.findOne({ name: subject });
    if (existingSubject) {
        subjects = yield Subject_1.default.findOneAndUpdate({ name: subject }, {
            $push: { questions: questionRef.map((q) => q._id) },
        }, { new: true });
    }
    else {
        subjects = new Subject_1.default({
            name: subject,
            createdBy: req.userId,
            questions: questionRef.map((q) => q._id),
        });
        subjects = yield subjects.save();
    }
    let existingDepartment = yield Department_1.default.findOne({
        name: department,
    });
    if (existingDepartment) {
        existingDepartment = yield Department_1.default.findOneAndUpdate({
            name: department,
        }, {
            $push: { subjects: subjects._id },
        }, { new: true });
    }
    else {
        let newDepartment = new Department_1.default({
            name: department,
            subjects: [subjects._id],
            createdBy: req.userId,
        });
        yield newDepartment.save();
    }
    res.status(201).json({ message: "Quiz created successfully" });
}));
exports.getQuiz = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deparmentId = req.params.departmentId;
    const subjectId = req.params.subjectId;
    const department = (yield Department_1.default.findOne({ _id: deparmentId }).populate({
        path: "subjects",
        populate: {
            path: "questions",
        },
    }));
    if (!department) {
        res.status(404).json({ message: "Department not found" });
        return;
    }
    const subject = department.subjects.find((subject) => subject._id.toString() === subjectId);
    if (!subject) {
        res.status(404).json({ message: "Subject not found" });
        return;
    }
    const questions = subject.questions;
    res.status(200).json({ questions });
}));
