import mongoose, { mongo } from "mongoose";

type ResultType = {
  attemptedBy: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  result: {
    correctlyAnswered: boolean;
    question: mongoose.Types.ObjectId;
    selectedAnswer: string;
  }[];
  timeTaken: number;
  unattempted: number;
};

const ResultSchema = new mongoose.Schema<ResultType>({
  attemptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  result: [
    {
      correctlyAnswered: {
        type: Boolean,
        required: true,
      },
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      selectedAnswer: {
        type: String,
        required: true,
      },
    },
  ],
  timeTaken: {
    type: Number,
    required: true,
  },
  unattempted: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model("Result", ResultSchema);

export default Result;
