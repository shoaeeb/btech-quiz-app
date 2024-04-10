import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Toast from "../components/Toast";

export type DepartmentType = {
  _id: string;
  name: string;
  createdAt: string;
  subjects: string[];
};

export type SubjectType = {
  _id: string;
  name: string;
  createdBy: string;
  questions: string[];
};

export type QuestionsType = {
  questions: QuestionType[];
};

export type QuestionType = {
  _id: string;
  question: string;
  options: string[];
  answer: string;
};

export type SetQuestion = {
  department: string;
  subject: string;
  questions: QuestionType[];
};

export type AnswerType = {
  questionId: string;
  question: string;
  correctAnswer: string;
  selectedAnswer?: string;
  correctlyAnswered: boolean;
  notAnswered: boolean;
  notVisited: boolean;
};

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type Props = {
  children: React.ReactNode;
};

type AppContext = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  department: DepartmentType | undefined;
  setDepartment: (department: DepartmentType) => void;
  subject: SubjectType | undefined;
  setSubject: (subject: SubjectType) => void;
  questions: QuestionsType | undefined;
  setQuestions: (questions: QuestionsType) => void;
  getPrevQuestion: (index: number) => QuestionType | undefined;
  getNextQuestion: (index: number) => QuestionType | undefined;
  getQuestion: () => QuestionType | undefined;
  index: number;
  setIndex: (index: number) => void;
  findCorrectAnswer: (
    question: QuestionType,
    selectedAnswer: string
  ) => boolean;
  storeAnswer: (answerType: AnswerType) => void;
  answered: AnswerType[] | undefined;
  onSubmitQuiz: (time: number) => void;
  notAnswered: number | undefined;
  visited: string[];
  setVisited: (id: string) => void;
  notVisited: number | undefined;
  setAnswer: (answer: AnswerType[]) => void;
  time: number;
  loggedInUser: apiClient.UserType | undefined;
  storeQuestionsToContext: (
    question: QuestionType,
    department?: string,
    subject?: string
  ) => void;
  getQuestionFromContext: (index: number) => QuestionType | undefined;
  submitQuestion: () => void;
  storeQuestions: SetQuestion;
  resetStoreQuestions: () => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [department, setDepartment] = useState<DepartmentType | undefined>(
    undefined
  );
  const [subject, setSubject] = useState<SubjectType | undefined>(undefined);
  const [questions, setQuestions] = useState<QuestionsType | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<AnswerType[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const [storeQuestions, setStoreQuestions] = useState<SetQuestion>({
    department: "",
    subject: "",
    questions: [],
  });
  const resetStoreQuestions = () => {
    setStoreQuestions({
      department: "",
      subject: "",
      questions: [],
    });
  };

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const { data: loggedInUser } = useQuery("loggedInUser", apiClient.getUser, {
    retry: false,
  });

  const storeQuestionsToContext = (
    question: QuestionType,
    department?: string,
    subject?: string
  ) => {
    const questionExists = storeQuestions.questions?.some(
      (q) => q._id === question._id
    );

    setStoreQuestions({
      ...storeQuestions,
      department: department || storeQuestions.department,
      subject: subject || storeQuestions.subject,
      questions: questionExists
        ? storeQuestions.questions?.map((q) => {
            if (q._id === question._id) {
              return question;
            }
            return q;
          })
        : [...(storeQuestions.questions || []), question],
    });
  };

  const submitQuestion = () => {
    console.log(storeQuestions);
  };

  const getQuestionFromContext = (index: number) => {
    return storeQuestions.questions[index];
  };

  const storeAnswer = (answerType: AnswerType) => {
    setAnswer((prev: AnswerType[]) => {
      const index = prev.findIndex(
        (a) => a.questionId === answerType.questionId
      );
      if (index !== -1) {
        // If the questionId is found, replace the existing answer with the new one
        return [...prev.slice(0, index), answerType, ...prev.slice(index + 1)];
      } else {
        // If the questionId is not found, add the new answer to the array
        return [...prev, answerType];
      }
    });
  };
  const findCorrectAnswer = (
    question: QuestionType,
    selectedAnswer: string
  ) => {
    return question.answer === selectedAnswer;
  };

  const answered = answer.filter((ans) => ans.notAnswered === false);
  const length = questions?.questions?.length || 0;
  const notAnswered = length - answered.length;
  const notVisited = length - visited.length;

  const getPrevQuestion = (index: number) => {
    if (index === 0) return questions?.questions[index];
    return questions?.questions[index - 1];
  };

  const getNextQuestion = (index: number) => {
    if (
      questions &&
      questions.questions &&
      index === questions.questions.length - 1
    )
      return questions.questions[index];
    return questions && questions.questions
      ? questions.questions[index + 1]
      : undefined;
  };

  const getQuestion = () => {
    if (questions?.questions) {
      const question = questions.questions[index];
      return question;
    }
  };

  const onSubmitQuiz = (time: number) => {
    console.log(answer);
    if (!questions?.questions.length) return;
    const timeForQuiz = questions?.questions?.length * 10 || 0;
    setTime(Math.abs(time - timeForQuiz));
  };
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (toastMessage: ToastMessage) => {
          setToast(toastMessage);
        },
        department,
        setDepartment,
        subject,
        setSubject,
        questions,
        setQuestions,
        getPrevQuestion,
        getNextQuestion,
        getQuestion,
        index,
        setIndex,
        storeAnswer,
        findCorrectAnswer,
        answered,
        onSubmitQuiz,
        notAnswered,
        visited,
        setAnswer,
        setVisited: (id: string) => {
          if (!id) return;
          const idExists = visited.includes(id);
          if (idExists) {
            return setVisited(visited);
          } else {
            return setVisited([...visited, id]);
          }
        },
        notVisited,
        time,
        loggedInUser,
        storeQuestionsToContext,
        getQuestionFromContext,
        submitQuestion,
        storeQuestions,
        resetStoreQuestions,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        ></Toast>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context as AppContext;
};
