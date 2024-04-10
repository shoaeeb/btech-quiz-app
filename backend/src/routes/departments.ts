import express from "express";
import { verifyToken } from "../middleware/auth";
import { getDepartments } from "../controllers/department";

const router = express.Router();

router.get("/", verifyToken, getDepartments);

export default router;
