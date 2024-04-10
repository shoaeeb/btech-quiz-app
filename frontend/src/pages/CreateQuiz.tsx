import { useEffect, useState } from "react";
import { QuestionType, useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const {
    storeQuestionsToContext,
    index,
    setIndex,
    showToast,
    storeQuestions,
  } = useAppContext();
  const [department, setDepartment] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [option3, setOption3] = useState<string>("");
  const [option4, setOption4] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>("");
  const navigate = useNavigate();

  const reset = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectOption("");
  };

  useEffect(() => {
    if (index === 0) {
      const existingQuestion = storeQuestions.questions[index];
      if (existingQuestion) {
        setDepartment(storeQuestions.department);
        setSubject(storeQuestions.subject);
        setQuestion(existingQuestion.question);
        setOption1(existingQuestion.options[0]);
        setOption2(existingQuestion.options[1]);
        setOption3(existingQuestion.options[2]);
        setOption4(existingQuestion.options[3]);
        setCorrectOption(existingQuestion.answer);
      }
    }
  }, [
    index,
    storeQuestions.questions,
    storeQuestions.department,
    storeQuestions.subject,
  ]);

  const handlePrevious = () => {
    if (index == 0) {
      return;
    }
    const existingQuestion = storeQuestions.questions[index - 1];
    console.log(existingQuestion);
    if (existingQuestion) {
      setQuestion(existingQuestion.question);
      setOption1(existingQuestion.options[0]);
      setOption2(existingQuestion.options[1]);
      setOption3(existingQuestion.options[2]);
      setOption4(existingQuestion.options[3]);
      setCorrectOption(existingQuestion.answer);
    }
    const questionS: QuestionType = {
      _id: existingQuestion?._id || crypto.randomUUID(),
      question,
      options: [option1, option2, option3, option4],
      answer: correctOption,
    };
    if (
      question == "" ||
      option1 == "" ||
      option2 == "" ||
      correctOption == ""
    ) {
      showToast({ message: "Please fill all the fields", type: "ERROR" });
      return;
    }
    storeQuestionsToContext(questionS, department, subject);
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (
      question === "" ||
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === "" ||
      correctOption === ""
    ) {
      return showToast({
        message: "Please fill all the fields",
        type: "ERROR",
      });
    }

    const existingQuestion = storeQuestions.questions[index];
    if (existingQuestion) {
      setQuestion(existingQuestion.question);
      setOption1(existingQuestion.options[0]);
      setOption2(existingQuestion.options[1]);
      setOption3(existingQuestion.options[2]);
      setOption4(existingQuestion.options[3]);
      setCorrectOption(existingQuestion.answer);
    }
    const questionS: QuestionType = {
      _id: existingQuestion?._id || crypto.randomUUID(),
      question,
      options: [option1, option2, option3, option4],
      answer: correctOption,
    };

    storeQuestionsToContext(questionS, department, subject);
    setIndex(index + 1);

    if (index + 1 > storeQuestions.questions.length) {
      reset();
    }
  };

  return (
    <div className="container flex flex-col gap-5">
      <h1>Current Question Number {index + 1}</h1>
      <input
        type="text"
        placeholder="Enter Department"
        className="border border-slate-500 px-2 py-1"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Subject"
        className="border border-slate-500 px-2 py-1"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Question"
        className="border border-slate-500 px-2 py-1"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Option 1"
        className="border border-slate-500 px-2 py-1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Option 2"
        className="border border-slate-500 px-2 py-1"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Option 3"
        className="border border-slate-500 px-2 py-1"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Option 4"
        className="border border-slate-500 px-2 py-1"
        value={option4}
        onChange={(e) => setOption4(e.target.value)}
      />
      <select
        onChange={(e) => setCorrectOption(e.target.value)}
        className="border border-slate-500 px-2 py-1"
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </select>
      <div className="flex justify-between gap-5">
        <button
          onClick={() => {
            handlePrevious();
          }}
          className="bg-red-400 px-2 py-1 text-white hover:bg-red-500"
        >
          Previous
        </button>
        <button
          onClick={() => {
            handleNext();
          }}
          className="bg-blue-400 px-2 py-1 text-white hover:bg-blue-500"
        >
          Next
        </button>
        <button
          onClick={() => {
            console.log(storeQuestions);
            navigate("/review-questions");
          }}
          className="bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
