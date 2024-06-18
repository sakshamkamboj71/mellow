import React from "react";
import { BiSolidAlbum } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import { PiPlaylistFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-20 h-full pt-16 fixed left-0 bg-[#000000] p-2 text-xs drop-shadow-xl hidden md:block z-40 overflow-auto">
      <div
        onClick={() => navigate("/")}
        className="w-16 h-16 flex flex-col justify-center items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer"
      >
        <div className="w-full flex justify-center text-2xl">
          <PiPlaylistFill className="" />
        </div>
        <div>Playlists</div>
      </div>
      <div
        onClick={() => navigate("/albums")}
        className="w-16 h-16 flex flex-col justify-center items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer"
      >
        <div className="w-full flex justify-center text-2xl">
          <BiSolidAlbum className="" />
        </div>
        <div>Albums</div>
      </div>
      <div
        onClick={() => navigate("/explore")}
        className="w-16 h-16 flex flex-col justify-center items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer"
      >
        <div className="w-full flex justify-center text-2xl">
          <MdExplore className="" />
        </div>
        <div>Explore</div>
      </div>
    </div>
  );
};

export default Sidebar;
