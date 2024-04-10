import express from "express";
import { createResult } from "../controllers/result";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/create", verifyToken, createResult);

export default router;
