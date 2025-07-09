import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
