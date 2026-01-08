import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className=" w-full bg-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
