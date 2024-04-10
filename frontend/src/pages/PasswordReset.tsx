import { Link } from "react-router-dom";
import Styles from "./PasswordReset.module.css";
import { useState } from "react";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../Context/AppContext";

const PasswordReset = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.passwordReset, {
    onSuccess: async () => {
      showToast({ message: `OTP Sent to ${email} `, type: "SUCCESS" });
    },
    onError: async () => {
      showToast({ message: "Error in sending OTP", type: "ERROR" });
    },
  });

  const passwordMutation = useMutation(apiClient.resetPassword, {
    onSuccess: async () => {
      showToast({ message: "Password Reset Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error);
    },
  });
  return (
    <div className="container">
      <form className={Styles.password_reset_form}>
        <h1>Forgot Password</h1>

        {!mutation.isSuccess && (
          <>
            <input
              name="email"
              type="email"
              className="border border-slate-500"
              placeholder="Enter your email...."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span id="error-email-message" className="hidden message">
              Enter your email
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate(email);
              }}
              type="submit"
              disabled={mutation.isLoading}
              className="submit disabled:bg-gray-300"
            >
              Send OTP
            </button>
          </>
        )}

        {mutation.isSuccess && (
          <>
            <input
              type="text"
              className="border border-slate-500"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              className="border border-slate-500"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                passwordMutation.mutate({ email, otp, password });
              }}
              type="submit"
              className="submit"
            >
              Reset Password
            </button>
          </>
        )}

        <p style={{ color: "black" }}>
          Back To Login Page
          <Link style={{ color: "blue" }} to="/login">
            Login
          </Link>
        </p>
        <p style={{ color: "black" }}>
          Not Registerd
          <Link style={{ color: "blue" }} to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordReset;
