import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Desktop collapse
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
      />

      <div
        className={`layout-content ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;