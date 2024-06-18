import React from "react";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeFolder,
  changeSingleSong,
  changeSong,
  changeUserInfo,
  toggleSidebar,
} from "../services/actions/action";

const Navbar = ({ type, setType, setValidity }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");

    dispatch(changeUserInfo({}));
    dispatch(changeFolder(null));
    dispatch(changeSong(null));
    dispatch(changeSingleSong(null));

    setType("");
    setValidity(false);

    navigate("/login");
  };

  const dispatch = useDispatch();
  const image = useSelector((state) => state.getDefaultDisk);

  return (
    <div className="w-full h-16 z-50 bg-[#000000] fixed top-0 flex justify-between items-center pl-4 z-50">
      <div className="flex gap-4 items-center h-full">
        {type === "user" && (
          <div
            onClick={() => dispatch(toggleSidebar())}
            className="w-12 h-12 flex justify-center items-center text-3xl select-none cursor-pointer hover:bg-[#1f1f1f] hover:text-[#894aff] rounded-full"
          >
            <LuMenu />
          </div>
        )}

        <div onClick={() => navigate("/")} className="w-16 h-16">
          <img
            src={image.logo}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h1 onClick={() => navigate("/")} className="text-2xl select-none">
          Mellow
        </h1>
      </div>
      <div className="h-full flex">
        <div
          onClick={() => navigate("/profile")}
          className="px-4 h-full flex items-center select-none cursor-pointer hover:bg-[#0f0f0f] font-semibold"
        >
          Profile
        </div>
        <div
          onClick={handleLogout}
          className="px-4 h-full flex items-center select-none cursor-pointer hover:bg-[#5E1ED4] font-semibold"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
