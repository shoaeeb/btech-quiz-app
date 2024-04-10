import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";

const ReviewQuestions = () => {
  const { storeQuestions, resetStoreQuestions, showToast, setIndex } =
    useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      showToast({ message: "Logout Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
      resetStoreQuestions();
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const submitQuestion = useMutation(apiClient.createQuiz, {
    onSuccess: async () => {
      showToast({ message: "Quiz Created", type: "SUCCESS" });
      navigate("/");
      resetStoreQuestions();
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return (
    <div className="container flex flex-col gap-5">
      <div>
        <h1>Review Questions</h1>
        <div className="h-[150px] max-h-[150px] overflow-y-scroll">
          {storeQuestions.questions.map((question, index) => (
            <div key={index}>
              <h1>{question.question}</h1>
              <div>
                {question.options.map((option, i) => (
                  <div key={i}>
                    <input
                      value={option}
                      type="radio"
                      disabled
                      checked={
                        option === question.options[Number(question.answer) - 1]
                      }
                    />
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setIndex(0);
          navigate("/create-quiz");
        }}
        className="bg-red-400 px-2 py-1 text-white hover:bg-red-500"
      >
        Change
      </button>

      <button
        onClick={() => {
          setIndex(0);
          navigate("/");
          submitQuestion.mutate(storeQuestions);
        }}
        className="bg-blue-400 px-2 py-1 text-white hover:bg-blue-500"
      >
        Set
      </button>
      <button
        onClick={() => {
          setIndex(0);
          navigate("/");
        }}
        className="bg-blue-400 px-2 py-1 text-white hover:bg-blue-500"
      >
        Home
      </button>
      <button
        onClick={() => {
          console.log("logout");
          mutation.mutate();
        }}
        className="bg-red-400 px-2 py-1 text-white hover:bg-red-500"
      >
        LogOut
      </button>
    </div>
  );
};

export default ReviewQuestions;
