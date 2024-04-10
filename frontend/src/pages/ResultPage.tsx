import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import styles from "./ResultPage.module.css";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

export type ResultType = {
  questionId: string;
  selectedAnswer?: string;
  correctlyAnswered: boolean;
};

const ResultPage = () => {
  const {
    answered,
    time,
    showToast,
    department,
    subject,
    setAnswer,
    questions,
  } = useAppContext();
  const navigate = useNavigate();
  const correct =
    answered?.filter((ans) => ans.correctlyAnswered === true).length || 0;
  const wrong =
    answered?.filter((ans) => ans.correctlyAnswered === false).length || 0;
  const total = questions?.questions.length || 0;
  const percent = (correct / total) * 100;
  const queryClient = useQueryClient();

  const resultMutation = useMutation(apiClient.postResult, {
    onSuccess: async () => {
      showToast({ message: "Result Submitted", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  let obj: apiClient.ObjType = {
    result: [],
    unattempted: total,
    departmentId: department?._id || "",
    subjectId: subject?._id || "",
    timeTaken: time,
  };
  if (answered) {
    const result: ResultType[] = answered.map((ans) => {
      return {
        questionId: ans.questionId,
        correctlyAnswered: ans.correctlyAnswered,
        selectedAnswer: ans.selectedAnswer,
      };
    });

    obj = {
      result: result,
      unattempted: total - correct - wrong,
      departmentId: department?._id || "",
      subjectId: subject?._id || "",
      timeTaken: time,
    };
  }

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      showToast({ message: "Logout Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  return (
    <div className={styles.main__container}>
      <div className={styles.result_card}>
        <h2>Result</h2>
        <p>
          Correct: <span id="correct">{correct}</span>
        </p>
        <p>
          Wrong: <span id="wrong">{wrong}</span>
        </p>
        <p>
          Total: <span id="total">{total}</span>
        </p>
        <p>
          Percent: <span id="percent">{percent}</span>%
        </p>

        <button
          onClick={() => {
            resultMutation.mutate(obj);
          }}
          className={
            "bg-blue-500 hover:bg-blue-600 text-white border-slate-500 "
          }
        >
          Save
        </button>
        <button
          onClick={() => {
            navigate("/quiz-page");
            setAnswer([]);
          }}
          className={styles.reset}
        >
          Reset
        </button>
        <button
          onClick={() => mutation.mutate()}
          className={styles.logout__button}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
