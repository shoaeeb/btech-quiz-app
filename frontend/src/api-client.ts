import { QuestionsType, SetQuestion } from "./Context/AppContext";
import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/login";
import { ResultType } from "./pages/ResultPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  console.log(responseBody.errors);

  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    credentials: "include",
    method: "POST",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/users/validate-token`, {
    credentials: "include",
    method: "GET",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const getDepartments = async () => {
  const response = await fetch(`${API_BASE_URL}/departments`, {
    credentials: "include",
    method: "GET",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const getSubjects = async (departmentId: string) => {
  const response = await fetch(`${API_BASE_URL}/subjects/${departmentId}`, {
    credentials: "include",
    method: "GET",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const getQuizQuestions = async (
  departmentId: string,
  subjectId: string
): Promise<QuestionsType> => {
  console.log("get quiz questions");
  const response = await fetch(
    `${API_BASE_URL}/quiz/${departmentId}/${subjectId}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const passwordReset = async (email: string) => {
  console.log(email);
  const response = await fetch(`${API_BASE_URL}/users/password-reset`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};
export type PassWordResetType = {
  email: string;
  password: string;
  otp: string;
};

export const resetPassword = async (resetFormData: PassWordResetType) => {
  const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(resetFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export type UserType = {
  name: string;
  email: string;
  _id: string;
  profilePic: string;
};
export const getUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/users/getuser`, {
    credentials: "include",
    method: "GET",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export type ObjType = {
  departmentId: string;
  subjectId: string;
  result: ResultType[];
  timeTaken: number;
  unattempted: number;
};

export const postResult = async (result: ObjType) => {
  const response = await fetch(`${API_BASE_URL}/results/create`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};

export const createQuiz = async (formData: SetQuestion) => {
  const response = await fetch(`${API_BASE_URL}/quiz/create`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errors);
  }
  return responseBody;
};
