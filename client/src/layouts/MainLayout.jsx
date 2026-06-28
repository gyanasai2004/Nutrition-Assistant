import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-content">
        <Navbar />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;