import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="container"
      style={{
        transform: "translateY(100%)",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Test your knowledge Sharpen your mind</h1>
      <h2>Sharpen your mind</h2>
      <Link className="get__started" to="/login">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
