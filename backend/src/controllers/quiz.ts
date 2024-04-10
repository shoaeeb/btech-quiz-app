import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../asyncWrapper";
import Question from "../models/Question";
import Subject from "../models/Subject";
import Department from "../models/Department";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

interface IDepartment {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdBy: mongoose.Types.ObjectId;
  subjects: ISubject[];
}

interface ISubject {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdBy: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
}

export const createQuiz = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log("createQuiz");
    const { questions, department, subject } = req.body;

    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors
          .array()
          .map((error: any) => error.msg + " " + error.path),
      });
      return;
    }

    let questionRef = questions.map(async (question: any) => {
      let q = new Question({
        question: question.question,
        options: question.options,
        answer: question.answer,
        createdBy: req.userId,
      });
      await q.save();
      return q;
    });
    questionRef = await Promise.all(questionRef);

    let subjects: any;
    let existingSubject = await Subject.findOne({ name: subject });
    if (existingSubject) {
      subjects = await Subject.findOneAndUpdate(
        { name: subject },
        {
          $push: { questions: questionRef.map((q: any) => q._id) },
        },
        { new: true }
      );
    } else {
      subjects = new Subject({
        name: subject,
        createdBy: req.userId,
        questions: questionRef.map((q: any) => q._id),
      });
      subjects = await subjects.save();
    }

    let existingDepartment = await Department.findOne({
      name: department,
    });

    if (existingDepartment) {
      existingDepartment = await Department.findOneAndUpdate(
        {
          name: department,
        },
        {
          $push: { subjects: subjects._id },
        },
        { new: true }
      );
    } else {
      let newDepartment = new Department({
        name: department,
        subjects: [subjects._id],
        createdBy: req.userId,
      });
      await newDepartment.save();
    }
    res.status(201).json({ message: "Quiz created successfully" });
  }
);

export const getQuiz = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const deparmentId = req.params.departmentId;
    const subjectId = req.params.subjectId;

    const department = (await Department.findOne({ _id: deparmentId }).populate(
      {
        path: "subjects",
        populate: {
          path: "questions",
        },
      }
    )) as IDepartment;
    if (!department) {
      res.status(404).json({ message: "Department not found" });
      return;
    }
    const subject = department.subjects.find(
      (subject: ISubject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      res.status(404).json({ message: "Subject not found" });
      return;
    }
    const questions = subject.questions;
    res.status(200).json({ questions });
  }
);
