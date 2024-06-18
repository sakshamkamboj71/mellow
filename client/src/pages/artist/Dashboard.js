import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UploadSong from "../../components/UploadSong";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [uploadSong, setUploadSong] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchSongs();
    fetchUserData();
  }, []);

  const image = useSelector((state) => state.getDefaultDisk);

  const fetchSongs = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/songs/fetch-artist-own-songs",
        { token }
      );
      setSongs(response.data.songs);
    } catch (err) {}
  };

  const fetchUserData = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/user-auth/get-user-data",
        { token }
      );
      setUser(response.data.user);
    } catch (err) {}
  };

  return (
    <>
      {uploadSong && <UploadSong setUploadSong={setUploadSong} />}

      <div className="flex w-full h-full">
        <div className="w-1/2 p-4">
          <div className="bg-[#1f1f1f] w-full h-full rounded-xl p-2 enableScroll">
            <div className="h-fit w-full flex">
              <div className="w-64 h-64 p-4 relative">
                <div className="absolute top-1 right-1 text-2xl flex justify-center items-center hover:bg-[#323232] rounded-full p-1">
                  <MdModeEdit />
                </div>
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt=""
                    className="w-full h-full object-contain rounded-full border-2 border-[#323232]"
                  />
                ) : (
                  <img
                    src={image.user}
                    alt="Loading..."
                    className="w-full h-full object-contain rounded-lg rounded-full border-2 border-[#323232]"
                  />
                )}
              </div>
              <div className="flex-grow p-4 py-8">
                <div className="text-xl">{user.name}</div>
                <div className="text-sm mb-2">@{user.username}</div>
                <div className="text-sm">{user.email}</div>
              </div>
            </div>
            <div className="w-full p-4">
              <div
                onClick={() => setUploadSong(true)}
                className="w-44 h-14 flex justify-center items-center rounded-md border-2 border-[#323232] hover:bg-[#323232] mb-2 select-none cursor-pointer"
              >
                Upload Song
              </div>
            </div>
          </div>
        </div>
        {/* button card */}

        {/* {/* SONGS CARD */}
        <div className="w-1/2 p-4">
          <div className="bg-[#1f1f1f] w-full h-full rounded-xl p-2 enableScroll">
            <div className="w-full flex justify-center items-center text-2xl border-b-2 px-2 mb-2 relative">
              <div
                onClick={() => fetchSongs()}
                className="absolute top-1 left-4"
              >
                <IoMdRefresh />
              </div>
              <div>My Songs</div>
            </div>
            {songs.map((song, ind) => {
              return (
                <div
                  key={ind}
                  className="w-full select-none cursor-pointer p-1 hover:bg-[#323232] rounded-md truncate"
                >
                  {song.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
