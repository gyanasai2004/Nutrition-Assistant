import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal:"maintain",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/register",user);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#43cea2,#185a9d)",
      }}
    >
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Left Side */}
        <div className="col-lg-5 text-white d-none d-lg-block">
          <h1 className="display-4 fw-bold">
            🍎 Join Nutri-Assist
          </h1>

          <p className="fs-5 mt-4">
            Create your account and start tracking
            calories, BMI, meals, water intake and
            personalized diet plans.
          </p>

          <div
            className="text-center mt-5"
            style={{ fontSize: "120px" }}
          >
            🥗
          </div>
        </div>

        {/* Register Card */}
        <div className="col-lg-5 col-md-8 col-sm-10">
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "25px",
              padding: "30px",
            }}
          >
            <h2 className="text-center mb-4">
              Create Account
            </h2>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="height"
                  placeholder="Height (cm)"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="weight"
                  placeholder="Weight (kg)"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  name="activityLevel"
                  onChange={handleChange}
                >
                  <option value="">Activity Level</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
                <select
                  name="goal"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="maintain">Maintain Weight</option>
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>

<br />
              </div>
            </div>

            <button
  className="btn btn-success w-100 mt-3"
  onClick={handleSubmit}
  style={{
    transition: "0.3s",
    fontWeight: "600",
    borderRadius: "10px",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#198754";
    e.target.style.transform = "scale(1.03)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "";
    e.target.style.transform = "scale(1)";
  }}
>
  Register
</button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;