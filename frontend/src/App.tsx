import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout/Layout";
import PasswordReset from "./pages/PasswordReset";
import SubjectChoose from "./pages/SubjectChoose";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { useAppContext } from "./Context/AppContext";
import FeildChoose from "./pages/FieldChoose";
import CreateQuiz from "./pages/CreateQuiz";
import ReviewQuestions from "./pages/ReviewQuestions";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      {isLoggedIn && (
        <Route
          path="/login"
          element={<Navigate to="/field-choose" replace />}
        />
      )}
      {!isLoggedIn && (
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
      )}

      {isLoggedIn && (
        <Route
          path="/register"
          element={<Navigate to="/field-choose" replace />}
        />
      )}
      {!isLoggedIn && (
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
      )}

      {isLoggedIn && <Route path="/quiz-page" element={<QuizPage />} />}

      {isLoggedIn && (
        <Route
          path="/subject-choose"
          element={
            <Layout>
              <SubjectChoose />
            </Layout>
          }
        />
      )}

      {isLoggedIn && (
        <Route
          path="/create-quiz"
          element={
            <Layout>
              <CreateQuiz />
            </Layout>
          }
        />
      )}

      {isLoggedIn && (
        <Route
          path="/result"
          element={
            <Layout>
              <ResultPage />
            </Layout>
          }
        />
      )}

      {isLoggedIn && (
        <Route
          path="/review-questions"
          element={
            <Layout>
              <ReviewQuestions />
            </Layout>
          }
        />
      )}

      {isLoggedIn && <Route path="/field-choose" element={<FeildChoose />} />}
    </Routes>
  );
}

export default App;
