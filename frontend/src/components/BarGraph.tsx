import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import {
  LinearScale,
  CategoryScale,
  Chart,
  BarController,
  BarElement,
} from "chart.js";
import { Link } from "react-router-dom";

const BarGraph = () => {
  const { department, subject } = useAppContext();
  Chart.register(LinearScale, CategoryScale, BarController, BarElement);
  const chartRef = useRef<Chart<"bar"> | null>(null);
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  const { data: barData, isLoading } = useQuery(
    "barData",
    () => apiClient.getResult(department?._id || "", subject?._id || ""),
    {
      enabled: !!department && !!subject,
    }
  );
  if (!barData || !department || !subject)
    return (
      <div className="container">
        <p>
          No Department or Subject Selected Please Go Back and select department
          and subject
        </p>
      </div>
    );
  const chartData = {
    labels: [
      "Total Time Taken",
      "Unattempted Questions",
      "Correctly Answered",
      "Total Questions",
      "Total Candidates",
    ],
    datasets: [
      {
        label: "Results",
        data: [
          barData.totalTimeTakenByAllStudents,
          barData.unattemptedQuestions,
          barData.correctlyAnswered,
          barData.totalQuestions,
          barData.totalCandidates,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="container">
      <h1>Results</h1>
      {isLoading && <p>Loading...</p>}
      {barData && <Bar ref={chartRef} data={chartData} options={options} />}
      <Link
        className="bg-blue-500 mt-1 px-2 py-1 text-white hover:bg-blue-500"
        to="/create-quiz"
      >
        Create Quiz
      </Link>
    </div>
  );
};

export default BarGraph;
