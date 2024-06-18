import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Message from "./Message";

const AddSongPlaylist = ({ setaddSongPlaylist, songId }) => {
  const [error, setError] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [value, setValue] = useState(false);
  const [message, setMessage] = useState(false);

  const image = useSelector((state) => state.getDefaultDisk);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/playlists/fetch-playlist-user",
        {
          token,
        }
      );
      setPlaylists(response.data.playlists);
    } catch (err) {}
  };

  const handleCancelClick = (e) => {
    if (e.target === e.currentTarget) {
      setaddSongPlaylist(false);
    }
  };

  const handleAddPlaylist = async (playlist) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/playlists/add-song-to-playlist",
        {
          token,
          songId,
          playlistId: playlist._id,
        }
      );

      setValue(false);
      setMessage(true);

      setTimeout(() => {
        setMessage(false);
        setaddSongPlaylist(false);
      }, 1000);
    } catch (err) {
      setValue(false);
      setError("Song already in playlist");

      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
  };

  if (message) {
    return <Message text="Song Added to Playlist" />;
  }

  return (
    <>
      <div
        onClick={handleCancelClick}
        className="fixed p-4 md:p-0 inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 enableScroll"
      >
        <div className="p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-[#1f1f1f] rounded-lg text-white enableScroll">
          <div className="w-full flex justify-center text-2xl mb-2 relative">
            Add Song
            <div
              onClick={() => setaddSongPlaylist(false)}
              className="absolute right-0 p-1 rounded-full hover:bg-[#323232]"
            >
              <RxCross2 />
            </div>
            {value && (
              <div className="absolute left-0 w-8 h-8 m-1 text-xl flex justify-center items-center">
                <FaHourglassStart />
              </div>
            )}
          </div>

          {playlists.length !== 0 && (
            <div className="flex items-center w-full text-xs mb-1">
              Select playlist
            </div>
          )}
          <div className="w-full enableScroll h-44 bg-[#0f0f0f] p-2">
            {playlists.length === 0 && (
              <>
                <div className="flex justify-center items-center w-full pt-2">
                  No playlist found
                </div>
                <div className="flex justify-center items-center w-full text-xs">
                  Please create a Playlist first
                </div>
              </>
            )}
            {playlists.map((playlist, ind) => {
              return (
                <div
                  key={ind}
                  onClick={() => handleAddPlaylist(playlist)}
                  className="w-full bg-[#1f1f1f] group hover:bg-[#323232] select-none cursor-pointer p-1 flex justify-between items-center mb-1"
                >
                  <div className="flex gap-2">
                    {playlist?.image ? (
                      <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                        <img
                          src={playlist.image}
                          alt=""
                          className="w-full h-full object-contain border-2 border-[#323232]"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                        <img
                          src={image.icon}
                          alt="Loading..."
                          className="w-full h-full object-contain rounded-lg border-2 border-[#323232]"
                        />
                      </div>
                    )}

                    <div className="w-64 truncate flex items-center">
                      {playlist.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {error && (
            <div className="flex justify-center items-center mt-2">
              <div className="p-2 text-[#894aff]">**{error}**</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddSongPlaylist;
