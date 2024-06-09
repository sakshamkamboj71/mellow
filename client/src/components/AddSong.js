import axios from "axios";
import "firebase/compat/storage";
import { default as React, useState } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Message from "./Message";

const AddSong = ({ setAddSong, currentSongs, playlistId }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [message, setMessage] = useState(false);

  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  const image = useSelector((state) => state.getDefaultDisk);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();

    if (query === "") {
      setError("Please enter a song name");
      setSongs([]);
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/songs/fetch-query-songs/${query}`,
        {
          token,
        }
      );

      setSongs(response.data.songs);
    } catch (err) {}
  };

  const handleCancelClick = (e) => {
    if (e.target === e.currentTarget) {
      setAddSong(false);
    }
  };

  const handleAdd = async (e) => {
    if (currentSongs.includes(e)) {
      return;
    }

    setValue(true);
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/playlists/add-song-to-playlist",
        {
          token,
          songId: e,
          playlistId,
        }
      );

      setValue(false);
      setMessage(true);

      setTimeout(() => {
        setMessage(false);
        setAddSong(false);
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

  if (loading) {
    return <Loading />;
  }

  if (message) {
    return <Message text="Song Added to Playlist" />;
  }

  return (
    <div
      onClick={handleCancelClick}
      className="fixed p-4 md:p-0 inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 enableScroll"
    >
      <div className="p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-[#1f1f1f] rounded-lg text-white enableScroll">
        <div className="w-full flex justify-center text-2xl mb-2 relative">
          Add Song
          <div
            onClick={() => setAddSong(false)}
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
        <form
          onSubmit={handleSearch}
          className="w-full h-12 flex rounded-xl mb-4"
        >
          <input
            id="name"
            type="text"
            placeholder=". . ."
            className="w-full h-full bg-[#0f0f0f] p-2 mb-2 outline-none border-none rounded-l-2xl"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="h-full w-16 flex justify-center items-center text-2xl rounded-r-2xl bg-[#323232]">
            <IoSearchOutline />
          </button>
        </form>
        {songs.length !== 0 && (
          <div className="flex items-center w-full text-xs mb-1">
            Select any song to add to playlist
          </div>
        )}
        <div className="w-full enableScroll h-44 bg-[#0f0f0f] p-2">
          {songs.length === 0 && (
            <div className="flex justify-center items-center w-full text-lg pt-2">
              No Songs Found
            </div>
          )}
          {songs.map((song, ind) => {
            return (
              <div
                key={ind}
                onClick={() => handleAdd(song._id)}
                className="w-full bg-[#1f1f1f] group hover:bg-[#323232] select-none cursor-pointer p-1 flex justify-between items-center mb-1"
              >
                <div className="flex gap-2">
                  {song?.image ? (
                    <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                      <img
                        src={song.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                      <img
                        src={image.icon}
                        alt="Loading..."
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  )}

                  <div className="w-64 truncate flex items-center">
                    {song.name}
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
  );
};

export default AddSong;
