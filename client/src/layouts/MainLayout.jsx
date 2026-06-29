import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}

      <div
        className="layout-content"
        style={{
          marginLeft: showSidebar ? "260px" : "0px",
          transition: "0.3s",
        }}
      >
        <Navbar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;