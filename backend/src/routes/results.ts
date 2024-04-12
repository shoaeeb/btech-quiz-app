import express from "express";
import { createResult, getResult } from "../controllers/result";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/create", verifyToken, createResult);
router.get("/getResults/:departmentId/:subjectId", verifyToken, getResult);

export default router;
