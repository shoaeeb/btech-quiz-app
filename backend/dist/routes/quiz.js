"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const quiz_1 = require("../controllers/quiz");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/create", auth_1.verifyToken, [
    (0, express_validator_1.check)("questions").isArray().withMessage("Questions must be an array"),
    (0, express_validator_1.check)("department").isString().withMessage("Department must be a string"),
    (0, express_validator_1.check)("subject").isString().withMessage("Subject must be a string"),
], quiz_1.createQuiz);
router.get("/:departmentId/:subjectId", quiz_1.getQuiz);
exports.default = router;
