import Department from "../models/Department";
import asyncWrapper from "../asyncWrapper";
import { Request, Response, NextFunction } from "express";

export const getDepartments = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const departments = await Department.find({});
    if (!departments) {
      res.status(404).json({ message: "No departments found " });
    }

    res.status(200).json(departments);
  }
);
