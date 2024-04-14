import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Login Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/field-choose");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error);
    },
  });
  const onSubmit = handleSubmit((data: LoginFormData) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <div className="container">
      <form onSubmit={onSubmit} className={styles.login__form}>
        <h1>Login Form</h1>

        <input
          type="email"
          placeholder="Enter your email...."
          className="border border-slate-500"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <span id="error-username-message" className=" message">
            {errors.email.message}
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
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="submit disabled:bg-gray-500"
        >
          Submit
        </button>
        <p style={{ color: "black", textAlign: "center" }}>
          Not Registered?
          <Link style={{ color: "blue" }} to="/register">
            Register
          </Link>
        </p>
        <p style={{ color: "black", textAlign: "center" }}>
          Forgot Password?
          <Link style={{ color: "blue" }} to="/password-reset">
            Reset
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
