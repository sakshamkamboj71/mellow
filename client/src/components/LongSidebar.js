import React from "react";
import { BiSolidAlbum } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import { PiPlaylistFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const LongSidebar = ({ userPlaylists }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-64 h-screen pt-16 bg-[#000000] fixed left-0 p-2 text-xs drop-shadow-xl z-40 hidden md:block overflow-auto">
        <div
          onClick={() => navigate("/")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <PiPlaylistFill className="" />
          </div>
          <div className="text-lg">Playlists</div>
        </div>
        <div
          onClick={() => navigate("/albums")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <BiSolidAlbum className="" />
          </div>
          <div className="text-lg">Albums</div>
        </div>
        <div
          onClick={() => navigate("/")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <MdExplore className="" />
          </div>
          <div className="text-lg">Explore</div>
        </div>

        <div className="w-full p-2 flex justify-center items-center text-lg bg-[#894aff] hover:bg-[#5E1ED4] mt-6 mb-2 rounded-md select-none cursor-pointer px-2">
          New Playlist +
        </div>

        <div className="mt-4 bg-[#1f1f1f] rounded-lg">
          {userPlaylists.map((playlist, ind) => {
            return (
              <div
                key={ind}
                className="w-full p-2 text-sm rounded-md hover:bg-[#323232] select-none cursor-pointer"
              >
                {playlist.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-64 h-screen pt-16 bg-[#000000] fixed left-0 p-2 text-xs drop-shadow-xl z-40 fixed md:hidden enableScroll">
        <div
          onClick={() => navigate("/")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <PiPlaylistFill className="" />
          </div>
          <div className="text-lg">Playlists</div>
        </div>
        <div
          onClick={() => navigate("/albums")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <BiSolidAlbum className="" />
          </div>
          <div className="text-lg">Albums</div>
        </div>
        <div
          onClick={() => navigate("/")}
          className="w-full h-14 flex gap-2 items-center bg-[#1f1f1f] hover:text-[#894aff] mb-2 rounded-md select-none cursor-pointer px-2"
        >
          <div className="flex text-2xl">
            <MdExplore className="" />
          </div>
          <div className="text-lg">Explore</div>
        </div>

        <div className="w-full p-2 flex justify-center items-center text-lg bg-[#894aff] hover:bg-[#5E1ED4] mt-6 mb-2 rounded-md select-none cursor-pointer px-2">
          New Playlist +
        </div>

        <div className="mt-4 bg-[#1f1f1f] rounded-lg">
          {userPlaylists.map((playlist, ind) => {
            return (
              <div
                key={ind}
                className="w-full p-2 text-sm rounded-md hover:bg-[#323232] select-none cursor-pointer"
              >
                {playlist.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LongSidebar;
