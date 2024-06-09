import React from "react";
import { Outlet } from "react-router-dom";

const ArtistHome = () => {
  return (
    <div className="flex flex-col w-full h-screen pt-16">
      <Outlet />
    </div>
  );
};

export default ArtistHome;
