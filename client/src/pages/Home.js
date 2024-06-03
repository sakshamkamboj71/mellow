import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-grow">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
