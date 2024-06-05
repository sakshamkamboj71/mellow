import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../services/actions/action";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8000/playlists/fetch-all-playlist",
      { token }
    );

    setPlaylists(response.data.playlists);
  };

  const dispatch = useDispatch();
  const myState = useSelector((state) => state.toggleLongSidebar);
  const image = useSelector((state) => state.getDefaultDisk);

  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-wrap justify-center">
      {myState && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed justify-center items-center w-full h-full bg-black md:hidden opacity-60 z-30"
        ></div>
      )}

      <div className="flex flex-wrap w-11/12 justify-center">
        {/* PLAYLIST CARD */}
        {playlists.map((playlist, ind) => {
          return (
            <div
              key={ind}
              onClick={() => navigate(`/playlist/${playlist._id}`)}
              className="w-52 h-64 m-2 flex flex-col select-none cursor-pointer hover:scale-[1.03] duration-150"
            >
              <div className="w-full h-52 rounded-lg bg-[#1f1f1f]">
                {playlist.image ? (
                  <img
                    src={playlist.image}
                    alt="User playlist"
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
              <div className="flex-grow text-sm flex flex-col justify-center px-2">
                <div>{playlist.name}</div>
                <div>{playlist.length} songs</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
