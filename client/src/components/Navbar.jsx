import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {}

    localStorage.removeItem("token");
    localStorage.removeItem("googleUser");
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="navbar-left">

        <button
  className="menu-btn"
  onClick={() => {
    if (window.innerWidth <= 991) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  }}
>
  ☰
</button>

        <h3 className="navbar-title">
          🥗 Nutrition Assistant
        </h3>

      </div>

      <div className="navbar-right">
        <ThemeToggle />

        <button
          className="btn btn-outline-danger"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>

    </header>
  );
}

export default Navbar;