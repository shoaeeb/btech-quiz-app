import express from "express";
import { verifyToken } from "../middleware/auth";
import { createQuiz, getQuiz } from "../controllers/quiz";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  [
    check("questions").isArray().withMessage("Questions must be an array"),
    check("department").isString().withMessage("Department must be a string"),
    check("subject").isString().withMessage("Subject must be a string"),
  ],
  createQuiz
);

router.get("/:departmentId/:subjectId", getQuiz);

export default router;
