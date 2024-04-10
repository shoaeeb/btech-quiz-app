import mongoose from "mongoose";
import asyncWrapper from "../asyncWrapper";
import { Request, Response, NextFunction } from "express";
import Department from "../models/Department";

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
export const getSubjectByDepartmentId = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const departmentId = req.params.departmentId;
    console.log(departmentId);

    const department: IDepartment | null = await Department.findOne({
      _id: departmentId,
    }).populate("subjects");

    if (!department) {
      res.status(404).json({ message: "Department not found" });
      return; // Add return statement to exit the function
    }
    res.status(200).json(department.subjects);
  }
);
