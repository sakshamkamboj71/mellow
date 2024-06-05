import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const myState = useSelector((state) => state.toggleLongSidebar);

  return (
    <div
      className={`flex flex-col w-full h-screen pt-16  ${
        myState ? "md:pl-64" : "md:pl-20"
      }`}
    >
      <Outlet />
    </div>
  );
};

export default Home;
