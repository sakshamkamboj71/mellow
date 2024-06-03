import React from "react";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ type, setType, setValidity }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");
    setType("");
    setValidity(false);

    navigate("/login");
  };

  return (
    <div className="w-full h-16 z-50 bg-[#000000] flex justify-between items-center pl-4">
      <div className="flex gap-4 items-center h-full">
        <div className="w-12 h-12 flex justify-center items-center text-3xl select-none cursor-pointer hover:bg-[#1f1f1f] hover:text-[#894aff] rounded-full">
          <LuMenu />
        </div>
        <div className="w-16 h-16">
          <img
            src="finalDisk.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl">Mellow</h1>
      </div>
      <div className="h-full">
        <div
          onClick={handleLogout}
          className="px-4 h-full flex items-center select-none cursor-pointer hover:bg-[#1f1f1f] hover:text-[#894aff]"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
