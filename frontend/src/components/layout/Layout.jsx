import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomTabBar from "./BottomTabBar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 md:ml-64 min-w-0 h-full">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto pt-16 pb-16 md:pb-0 px-4 md:px-6">
          {children}
        </main>
      </div>
      <BottomTabBar />
    </div>
  );
}