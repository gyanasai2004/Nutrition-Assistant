import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
}) {
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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        } ${collapsed ? "collapsed" : ""}`}
      >
        {/* Logo */}
        <h2 className="sidebar-logo">
          {collapsed ? "🥗" : "🥗 NutriAssist"}
        </h2>

        {/* Menu */}
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 992) {
                  setSidebarOpen(false);
                }
              }}
              className={
                location.pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>{item.icon}</span>

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="sidebar-footer">
            Version 1.0
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;