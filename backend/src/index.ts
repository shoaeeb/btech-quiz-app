import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import departmentRouter from "./routes/departments";
import quizRouter from "./routes/quiz";
import subjectRouter from "./routes/subjects";
import resultRouter from "./routes/results";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Database Connected");
});

const app = express();

app.use(
  cors({
    origin: " http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/results", resultRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
