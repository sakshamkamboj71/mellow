import axios from "axios";
import "firebase/compat/storage";
import { default as React, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Loading from "./Loading";
import Message from "./Message";

const EditPlaylistName = ({ setPlaylistName, playlistId }) => {
  const [newName, setnewName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleCancelClick = (e) => {
    if (e.target === e.currentTarget) {
      setPlaylistName(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const name = newName.trim();

    if (name === "") {
      setError("Please provide a name");
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/playlists/update-playlist-name",
        {
          token,
          playlistId,
          newName: name,
        }
      );

      setMessage(true);

      setTimeout(() => {
        setMessage(false);
        setPlaylistName(false);
      }, 1000);
    } catch (err) {}
  };

  if (loading) {
    return <Loading />;
  }

  if (message) {
    return <Message text="Playlist Name Updated" />;
  }

  return (
    <div
      onClick={handleCancelClick}
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    >
      <div className="p-4 w-1/3 bg-[#1f1f1f] rounded-lg text-white">
        <div className="w-full flex justify-center text-2xl mb-2 relative">
          Edit Playlist Name
          <div
            onClick={() => setPlaylistName(false)}
            className="absolute right-0 p-1 rounded-full hover:bg-[#323232]"
          >
            <RxCross2 />
          </div>
        </div>

        <form onSubmit={handleSearch} className="w-full rounded-xl">
          <input
            id="name"
            type="text"
            placeholder=". . ."
            className="w-full h-full bg-[#0f0f0f] p-2 outline-none border-none rounded-2xl"
            autoComplete="off"
            value={newName}
            onChange={(e) => setnewName(e.target.value)}
          />

          <div className="w-full flex justify-between select-none mt-4">
            <div
              onClick={() => setPlaylistName(false)}
              className="p-2 w-24 flex justify-center items-center bg-[#323232] rounded-md cursor-pointer"
            >
              Cancel
            </div>
            <button className="p-2 w-24 flex justify-center items-center bg-[#894aff] rounded-md cursor-pointer hover:bg-[#5E1ED4]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistName;
