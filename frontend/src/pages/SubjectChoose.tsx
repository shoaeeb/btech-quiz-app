import { useQuery } from "react-query";
import { SubjectType, useAppContext } from "../Context/AppContext";
import styles from "./SubjectChoose.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const SubjectChoose = () => {
  const { department, subject, setSubject } = useAppContext();

  const navigate = useNavigate();

  const { data: subjects, isLoading } = useQuery(
    "subjects",
    () => apiClient.getSubjects(department?._id || ""),
    {
      enabled: !!department,
    }
  );
  if (!department) {
    return <Navigate to="/field-choose" />;
  }

  return (
    <div className="container" style={{ transform: "translateY(60%)" }}>
      <div className={styles.category__section}>
        <h1>Select Subject</h1>
        <div className={styles.categories}>
          {/* <div data-quiz-id="165645">Pipes and Cisterns</div>
          <div data-quiz-id="265645">Probability</div>
          <div data-quiz-id="365645">Problem On Ages</div>
          <div data-quiz-id="465645">Profit And Loss</div> */}
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            subjects.length > 0 &&
            subjects.map((subject: SubjectType) => (
              <div
                onClick={() => setSubject(subject)}
                data-quiz-id={subject._id}
                key={subject._id}
              >
                {subject.name}
              </div>
            ))}
        </div>
      </div>

      {subject && (
        <div className=" flex justify-center mb-2">
          <div
            onClick={() => {
              navigate("/quiz-page");
            }}
            className="w-fit  bg-blue-500 px-2 py-2 text-white "
          >
            Attempt Quiz
          </div>
        </div>
      )}

      {subject && (
        <div className=" flex justify-center mt-5">
          <div
            onClick={() => {
              navigate("/analysis");
            }}
            className="w-fit  bg-blue-500 px-2 py-2 text-white "
          >
            Create Quiz
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectChoose;
