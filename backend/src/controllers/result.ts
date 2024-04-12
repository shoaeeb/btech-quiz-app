import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../asyncWrapper";
import Result from "../models/Result";
import Subject from "../models/Subject";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createResult = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const obj = req.body;
    const result = new Result({
      ...obj,
      attemptedBy: req.userId,
    });
    await result.save();
    res.status(201).json({ result });
  }
);

export const getResult = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const departmentId = req.params.departmentId;
    const subjectId = req.params.subjectId;

    let results = await Result.find({
      departmentId,
      subjectId,
    });
    const totalTimeTakenByAllStudents = results.reduce(
      (acc, curr) => acc + curr.timeTaken,
      0
    );
    const unattemptedQuestions = results.reduce(
      (acc, curr) => acc + curr.unattempted,
      0
    );
    const correctlyAnswered = results.reduce(
      (acc, curr) =>
        acc + curr.result.filter((res) => res.correctlyAnswered).length,
      0
    );
    const subject = await Subject.findOne({ _id: subjectId });
    const totalQuestions = subject?.questions.length || 0;

    let totalCandidates = results.filter(
      (result) => result.attemptedBy.toString() !== req.userId
    ).length;
    if (
      results.filter((result) => result.attemptedBy.toString() === req.userId)
        .length > 0
    ) {
      totalCandidates += 1;
    }

    res.status(200).json({
      totalQuestions,
      totalTimeTakenByAllStudents,
      unattemptedQuestions,
      correctlyAnswered,
      totalCandidates,
    });
  }
);
