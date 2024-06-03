import axios from "axios";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="flex-grow flex flex-wrap enableScroll justify-center">
      <div className="flex flex-wrap w-11/12 justify-center">
        {/* PLAYLIST CARD */}

        {playlists.map((playlist, ind) => {
          return (
            <div
              key={ind}
              className="w-52 h-64 m-2 flex flex-col select-none cursor-pointer hover:scale-[1.03] duration-150 shadow-xs shadow-white"
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
                    src="finalLogo.jpg"
                    alt="Playlist default logo"
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
