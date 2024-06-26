"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const department_1 = require("../controllers/department");
const router = express_1.default.Router();
router.get("/", auth_1.verifyToken, department_1.getDepartments);
exports.default = router;
