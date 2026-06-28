import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email Login
  const login = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Photo URL:", user.photoURL);

      localStorage.setItem(
        "googleUser",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#6dd5ed,#2193b0)",
      }}
    >
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Left */}
        <div className="col-lg-6 text-center text-white d-none d-lg-block">
          <h1 className="display-4 fw-bold">
            🥗 Nutrition Assistant
          </h1>

          <p className="fs-4 mt-4">
            Track your nutrition, monitor your BMI,
            plan healthy meals and achieve your fitness goals.
          </p>

          <div style={{ fontSize: "120px" }}>
            🍎
          </div>
        </div>

        {/* Right */}
        <div className="col-lg-4 col-md-8 col-sm-10">
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2 className="text-center mb-4">
              Login
            </h2>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={login}
            >
              Login
            </button>

            <button
              className="btn btn-danger w-100 mt-3"
              onClick={googleLogin}
            >
              Continue with Google
            </button>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;