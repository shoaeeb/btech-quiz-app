import { useAppContext } from "../Context/AppContext";
import styles from "./QuizPage.module.css";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const QuizPage = () => {
  const {
    department,
    subject,
    getQuestion,
    index,
    setIndex,
    setQuestions,
    showToast,
    storeAnswer,
    findCorrectAnswer,
    answered,
    onSubmitQuiz,
    notAnswered,
    setVisited,
    notVisited,
    loggedInUser,
  } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef(time);

  const { data: questions, isLoading } = useQuery(
    "questions",
    () =>
      apiClient.getQuizQuestions(department?._id || " ", subject?._id || ""),
    {
      enabled: !!department && !!subject,
    }
  );

  const question = getQuestion();
  const navigate = useNavigate();

  useEffect(() => {
    setVisited(question?._id || "");
  }, [question?._id, setVisited]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    const time = (questions?.questions.length || 0) * 10;
    setTime(time);
    const interval = setInterval(() => {
      if (timeRef.current > 0) {
        setTime((prev) => prev - 1);
      }
      if (timeRef.current === 0) {
        onSubmitQuiz(timeRef.current);
        navigate("/result");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [questions?.questions.length]);
  useEffect(() => {
    if (questions && questions?.questions.length > 0) setQuestions(questions);
  }, [questions, setQuestions]);
  if (!department || !subject) {
    return <Navigate to="/field-choose" />;
  }

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  return (
    <>
      <div className={styles.navbar}>
        <div>General Awareness</div>
        <div className={styles.timer}>
          Time Left:{" "}
          {Math.floor(timeRef.current / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(timeRef.current % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>
      <div className={styles.main_content}>
        <div className={styles.quiz_container}>
          <div className={styles.question}>
            <h2>Question No.{index + 1}</h2>
            <h4 style={{ marginTop: "5px" }}>{question?.question}</h4>
            <ul className={styles.options}>
              {/* <li>
                <input type="radio" name="option" /> Foreign Minister of Britain
              </li>
              <li>
                <input type="radio" name="option" /> Foreign Secretary of U.S.A
              </li>
              <li>
                <input type="radio" name="option" /> Foreign Minister of France
              </li>
              <li>
                <input type="radio" name="option" /> Deputy Prime Minister of
                France
              </li>
              <li>
                <input type="radio" name="option" /> None of these
              </li> */}
              {question?.options.map((option, i) => (
                <li key={i}>
                  <input
                    checked={selectedAnswer === (i + 1).toString()}
                    name={question._id.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const answer = (i + 1).toString();
                      const isAnswerCorrect = findCorrectAnswer(
                        question,
                        answer
                      );
                      setSelectedAnswer(answer);
                      storeAnswer({
                        questionId: question._id,
                        question: question.question,
                        correctAnswer: question.answer,
                        selectedAnswer: e.target.value,
                        correctlyAnswered: isAnswerCorrect,
                        notAnswered: false,
                        notVisited: false,
                      });
                    }}
                    value={option}
                    type="radio"
                  />
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={styles.actions}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              className="border bg-red-400 hover:bg-red-500 text-white border-slate-500"
              onClick={() => {
                if (index == 0) return;
                setIndex(index - 1);
                setSelectedAnswer("");
              }}
            >
              Previous
            </button>

            <button
              className="border bg-blue-400 hover:bg-blue-500 text-white border-slate-500"
              onClick={() => {
                if (
                  questions?.questions &&
                  index === questions?.questions.length - 1
                )
                  return;
                setIndex(index + 1);
                setSelectedAnswer("");
                if (!selectedAnswer) {
                  storeAnswer({
                    questionId: question?._id || "",
                    correctAnswer: question?.answer || "",
                    question: question?.question || "",
                    selectedAnswer: "",
                    correctlyAnswered: false,
                    notAnswered: true,
                    notVisited: false,
                  });
                }
              }}
            >
              Next
            </button>
            <button
              onClick={() => {
                showToast({
                  message: "Answer Saved Successfully",
                  type: "SUCCESS",
                });
                if (
                  questions?.questions &&
                  index === questions?.questions.length - 1
                )
                  return;
                setIndex(index + 1);
              }}
              className="border bg-blue-500 hover:bg-blue-600 text-white border-slate-500"
            >
              Save & Next
            </button>
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.profile}>
            <img
              src={
                loggedInUser?.profilePic
                  ? loggedInUser?.profilePic
                  : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              }
              alt="Profile Picture"
              width="80"
              height="80"
            />
            <p>{loggedInUser?.name}</p>
          </div>
          <div className="">
            <div className={styles.container}>
              <div>
                <div className={styles.answered}>{answered?.length}</div>
                Answered
              </div>
              <div>
                <div className={styles.not_answered}>{notAnswered}</div>
                Not Answered
              </div>
              <div>
                <div className={styles.not_visited}>{notVisited}</div>
                Not Visited
              </div>
            </div>
          </div>
          <div className={`${styles.status_panel} cursor-pointer`}>
            <h3>General Awareness:</h3>
            <p>Choose a Question</p>
            {questions?.questions.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={styles.rounded_options}
              >
                {i + 1}
              </div>
            ))}
            <div
              className={styles.actions}
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => {
                  console.log("Submitting quiz...");
                  onSubmitQuiz(time);
                  console.log("Navigating to result page...");
                  navigate("/result");
                  console.log("Navigation complete.");
                }}
                className="border bg-blue-500 hover:bg-blue-500 text-white border-slate-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
