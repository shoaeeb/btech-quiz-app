import styles from "./SubjectChoose.module.css";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { DepartmentType, useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const FeildChoose = () => {
  const { data: departments, isLoading } = useQuery(
    "departments",
    apiClient.getDepartments
  );
  const { department, setDepartment } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="container" style={{ transform: "translateY(60%)" }}>
      <div className={styles.category__section}>
        <h1>Choose Feild</h1>
        <p className="hidden message">Enter your name to continue</p>
        <div className={styles.categories}>
          {/* <div data-quiz-id="165645">Pipes and Cisterns</div>
          <div data-quiz-id="265645">Probability</div>
          <div data-quiz-id="365645">Problem On Ages</div>
          <div data-quiz-id="465645">Profit And Loss</div> */}
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            departments.length > 0 &&
            departments.map((department: DepartmentType) => (
              <div
                onClick={() => setDepartment(department)}
                data-quiz-id={department._id}
                key={department._id}
              >
                {department.name}
              </div>
            ))}
        </div>
      </div>
      {department && (
        <div className="flex justify-center">
          <div
            onClick={() => {
              navigate("/subject-choose");
            }}
            className="bg-blue-400 w-fit   px-2 py-2 text-white border border-slate-100"
          >
            Choose Subject
          </div>
        </div>
      )}
    </div>
  );
};

export default FeildChoose;
