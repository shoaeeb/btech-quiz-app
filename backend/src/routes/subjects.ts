import express from "express";
import { getSubjectByDepartmentId } from "../controllers/subject";

const router = express.Router();

router.get("/:departmentId", getSubjectByDepartmentId);

export default router;
