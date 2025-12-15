import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarUi from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/asideBar/AsideBar";

export default function MainLayout() {
  return (
    <>
      <NavbarUi />

      <main className="min-h-screen bg-gray-200 ">
        <div className="container p-5">
          <div className="grid grid-cols-4 gap-3 ">
            <div className="md:col-span-1">
              <div className="fixed hidden md:block ">
                <Sidebar />
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 lg:col-span-2 space-y-5 ">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
