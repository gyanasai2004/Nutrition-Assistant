import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-5 text-center shadow-lg" style={{ maxWidth: "700px", borderRadius: "25px" }}>
        <div style={{ fontSize: "60px" }}>🍎</div>

        <h1 className="mt-3">
          Welcome to <span className="text-success">Nutri-Assist</span>
        </h1>

        <p className="text-muted mt-3">
          Your personalized nutrition planner. Get expert diet
          suggestions based on your age, weight, BMI and lifestyle.
        </p>

        <div className="row mt-4">
          <div className="col">
            🥗 Healthy Diets
          </div>

          <div className="col">
            💖 Fitness Tracking
          </div>

          <div className="col">
            🍽 Meal Planning
          </div>
        </div>

        <div className="mt-5">

          <Link
            to="/login"
            className="btn btn-dark me-3 px-4"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn btn-success px-4"
          >
            Signup
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Landing;