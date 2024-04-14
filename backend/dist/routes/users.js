"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.check)("name", "This field is required").isString().isLength({ min: 3 }),
    (0, express_validator_1.check)("email", "This field is required").isEmail(),
    (0, express_validator_1.check)("password", "This field is required").isString().isLength({ min: 6 }),
], users_1.signUp);
router.post("/login", [
    (0, express_validator_1.check)("email", "This field is required").isEmail(),
    (0, express_validator_1.check)("password", "This field is required").isString().isLength({ min: 6 }),
], auth_1.login);
router.post("/logout", auth_1.logout);
router.get("/validate-token", auth_2.verifyToken, users_1.validateToken);
router.get("/getuser", auth_2.verifyToken, users_1.getUser);
router.post("/password-reset", [(0, express_validator_1.check)("email", "This field is required").isEmail()], auth_1.passwordReset);
router.post("/verify-otp", [
    (0, express_validator_1.check)("otp", "This field is required")
        .isString()
        .isLength({ min: 6, max: 6 }),
    (0, express_validator_1.check)("email", "This field is required").isEmail(),
    (0, express_validator_1.check)("password", "This field is required").isString(),
], auth_1.verifyOtp);
exports.default = router;
