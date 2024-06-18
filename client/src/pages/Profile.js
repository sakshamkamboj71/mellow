import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = ({ userPlaylists }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const image = useSelector((state) => state.getDefaultDisk);

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
    <div className="flex-grow flex flex-wrap enableScroll justify-center p-4 mb-24">
      <div className="w-11/12 bg-[#1f1f1f] rounded-xl justify-center">
        {/* PROFILE CARD */}
        <div className="w-full h-fit flex items-center">
          <div className="w-48 xl:w-64 h-48 xl:h-64 p-4 relative">
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
                className="w-full h-full object-contain rounded-full border-2 border-[#323232]"
              />
            )}
          </div>
          <div className="flex-grow h-full p-4">
            <div className="text-xl">{user.name}</div>
            <div className="text-sm mb-2">@{user.username}</div>
            <div className="text-sm">{user.email}</div>
          </div>
        </div>

        <div className="w-full p-4">
          <div className="text-2xl border-b-2 border-[#323232]">Playlists</div>
          <div className="mt-4 bg-[#1f1f1f] rounded-lg">
            {userPlaylists.map((playlist, ind) => {
              return (
                <div
                  key={ind}
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                  className="w-full p-2 hover:bg-[#323232] select-none cursor-pointer truncate flex"
                >
                  <div className="w-24 h-24">
                    {playlist.image ? (
                      <img
                        src={playlist.image}
                        alt="Loading..."
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src={image.icon}
                        alt="Loading..."
                        className="w-full h-full object-contain rounded-lg"
                      />
                    )}
                  </div>
                  <div className="p-4 text-base">
                    <div>{playlist.name}</div>
                    <div className="text-sm">{playlist.length} songs</div>
                    <div className="text-sm">{playlist.privacy}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
