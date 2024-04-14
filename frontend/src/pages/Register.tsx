import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";

export type RegisterFormData = {
  email: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Register Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/choose-field");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <div className="container">
      <form onSubmit={onSubmit} className={styles.register__form}>
        <h1>Create a Quiz Account</h1>
        <input
          type="email"
          placeholder="Enter your email...."
          className="border border-slate-500"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <span id="error-email-message" className=" message">
            {errors.email.message}
          </span>
        )}
        <input
          type="text"
          placeholder="Enter your name...."
          className="border border-slate-500"
          {...register("name", {
            required: "this field is required",
          })}
        />
        {errors.name && (
          <span id="error-name-message" className=" message">
            {errors.name.message}
          </span>
        )}
        <input
          type="text"
          placeholder="Enter your username...."
          className="border border-slate-500"
          {...register("username", {
            required: "this field is required",
          })}
        />
        {errors.username && (
          <span id="error-username-message" className=" message">
            {errors.username.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Enter your password..."
          className="border border-slate-500"
          {...register("password", {
            required: "This field is required",
          })}
        />
        {errors.password && (
          <span id="error-password-message" className=" message">
            {errors.password.message}
          </span>
        )}
        <label>Verify your password</label>
        <input
          type="password"
          placeholder="Verify your password..."
          className="border border-slate-500"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value: string) => {
              if (value === watch("password")) return true;
              else return "Passwords do not match";
            },
          })}
        />
        {errors.confirmPassword && (
          <span id="error-retype-password-message" className=" message">
            {errors.confirmPassword.message}
          </span>
        )}
        <button type="submit" className="submit">
          Regiser
        </button>
        <p style={{ color: "black", textAlign: "center" }}>
          Back To Login Page
          <Link style={{ color: "blue" }} to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
