import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Meal Tracker", path: "/meal-tracker", icon: "🍽️" },
    { name: "Food Search", path: "/food-search", icon: "🔍" },
    { name: "Diet Plan", path: "/diet-plan", icon: "🥗" },
    { name: "Profile", path: "/profile-edit", icon: "👤" },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">🥗 NutriAssist</h2>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={
                location.pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          Version 1.0
        </div>
      </aside>
    </>
  );
}

export default Sidebar;