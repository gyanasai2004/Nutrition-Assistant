import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Email Login
  const login = async () => {
    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      setPageLoading(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      localStorage.setItem(
        "googleUser",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      toast.success("Google Login Successful");

      setPageLoading(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      toast.error("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const forgotPassword = async () => {
    if (!email) {
      toast.warning("Enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (pageLoading) {
    return <Loader text="Logging you in..." />;
  }

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
        {/* Left Side */}
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

        {/* Login Card */}
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

            {/* Password */}
            <div className="input-group mb-2">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    login();
                  }
                }}
              />

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="text-end mb-3">
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              className="btn btn-success w-100"
              onClick={login}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <button
              className="btn btn-danger w-100 mt-3"
              onClick={googleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Please wait...
                </>
              ) : (
                <>
                  <i className="bi bi-google me-2"></i>
                  Continue with Google
                </>
              )}
            </button>

            <hr />

            <p className="text-center mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="fw-bold text-decoration-none"
              >
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