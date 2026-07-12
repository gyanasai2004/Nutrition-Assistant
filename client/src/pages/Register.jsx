import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    goal: "maintain",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !confirmPassword ||
      !user.age ||
      !user.gender ||
      !user.height ||
      !user.weight ||
      !user.activityLevel
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.post("/register", user);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#43cea2,#185a9d)",
      }}
    >
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Left Side */}

        <div className="col-lg-5 text-white d-none d-lg-block">

          <h1 className="display-4 fw-bold">
            🥗 Join Nutri-Assist
          </h1>

          <p className="fs-5 mt-4">
            Create your account and start tracking
            Calories, BMI, Meals, Water Intake and
            Personalized Diet Plans.
          </p>

          <div
            className="text-center mt-5"
            style={{ fontSize: "120px" }}
          >
            🥗
          </div>

        </div>

        {/* Register Card */}

        <div className="col-lg-5 col-md-8 col-sm-11">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "25px",
              padding: "35px",
            }}
          >

            <h2 className="text-center mb-4">
              Create Account
            </h2>

            <div className="row">

              {/* Name */}

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}

              <div className="col-md-6 mb-3">

                <div className="input-group">

                  <input
                    className="form-control"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div className="col-md-6 mb-3">

                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* Age */}

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}

              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>
              </div>

              {/* Height */}

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  onChange={handleChange}
                />
              </div>

              {/* Weight */}

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  onChange={handleChange}
                />
              </div>

              {/* Activity */}

              <div className="col-md-6 mb-3">

                <select
                  className="form-select"
                  name="activityLevel"
                  onChange={handleChange}
                >

                  <option value="">
                    Activity Level
                  </option>

                  <option value="low">
                    Low
                  </option>

                  <option value="moderate">
                    Moderate
                  </option>

                  <option value="high">
                    High
                  </option>

                </select>

              </div>

              {/* Goal */}

              <div className="col-md-6 mb-3">

                <select
                  className="form-select"
                  name="goal"
                  onChange={handleChange}
                >

                  <option value="maintain">
                    Maintain Weight
                  </option>

                  <option value="lose">
                    Lose Weight
                  </option>

                  <option value="gain">
                    Gain Weight
                  </option>

                </select>

              </div>

            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >

              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}

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