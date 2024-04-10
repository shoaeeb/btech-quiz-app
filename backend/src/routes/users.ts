import express from "express";
import { check } from "express-validator";
import { getUser, signUp, validateToken } from "../controllers/users";
import { login, logout, passwordReset, verifyOtp } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "This field is required").isString().isLength({ min: 3 }),
    check("email", "This field is required").isEmail(),
    check("password", "This field is required").isString().isLength({ min: 6 }),
  ],
  signUp
);

router.post(
  "/login",
  [
    check("email", "This field is required").isEmail(),
    check("password", "This field is required").isString().isLength({ min: 6 }),
  ],
  login
);

router.post("/logout", logout);

router.get("/validate-token", verifyToken, validateToken);
router.get("/getuser", verifyToken, getUser);
router.post(
  "/password-reset",
  [check("email", "This field is required").isEmail()],
  passwordReset
);
router.post(
  "/verify-otp",
  [
    check("otp", "This field is required")
      .isString()
      .isLength({ min: 6, max: 6 }),
    check("email", "This field is required").isEmail(),
    check("password", "This field is required").isString(),
  ],
  verifyOtp
);
export default router;
