"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const result_1 = require("../controllers/result");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.verifyToken, result_1.createResult);
router.get("/getResults/:departmentId/:subjectId", auth_1.verifyToken, result_1.getResult);
exports.default = router;
