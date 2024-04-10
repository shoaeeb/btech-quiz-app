import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
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
