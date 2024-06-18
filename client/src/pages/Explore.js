import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import AddSongPlaylist from "../components/AddSongPlaylist";
import SoftLoading from "../components/SoftLoading";
import {
  changeFolder,
  changeSingleSong,
  changeSong,
} from "../services/actions/action";

const Explore = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingSongId, setAddingSongId] = useState("");

  const [addSongPlaylist, setaddSongPlaylist] = useState(false);

  const image = useSelector((state) => state.getDefaultDisk);
  const songInfo = useSelector((state) => state.songInfo);

  const dispatch = useDispatch();

  const fetchSongs = async () => {
    const token = window.localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8000/songs/fetch-all-songs",
      {
        token,
      }
    );

    setLoading(false);
    setSongs(response.data.songs);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSingleSong = (e, song) => {
    if (songInfo.folderPlaying !== null) {
      dispatch(changeFolder(null));
    }
    if (songInfo.songPlaying !== null) {
      dispatch(changeSong(null));
    }
    if (songInfo.singleSong === null || songInfo.singleSong?._id !== song._id) {
      dispatch(changeSingleSong(song));
    }
  };

  if (loading) {
    return <SoftLoading />;
  }
  return (
    <>
      {addSongPlaylist && (
        <AddSongPlaylist
          setaddSongPlaylist={setaddSongPlaylist}
          songId={addingSongId}
        />
      )}
      <div className="w-full h-full flex justify-center mb-24">
        <div className="w-11/12 h-full">
          <div className="w-full h-fit text-3xl flex items-center justify-center p-4">
            Explore Songs
          </div>
          <div className="w-full h-fit flex items-center px-4">
            <div className="select-none p-2 cursor-pointer hover:bg-[#323232] rounded-lg">
              Sort By
            </div>
          </div>
          <div className="h-fit p-4 w-full enableScroll">
            {songs.map((song, ind) => {
              return (
                <div
                  key={ind}
                  onClick={(e) => {
                    handleSingleSong(e, song);
                  }}
                  className="w-full my-1 bg-[#1f1f1f] hover:bg-[#323232] select-none cursor-pointer p-1 flex justify-between items-center rounded-md"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                      {song?.image ? (
                        <img
                          src={song.image}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={image.icon}
                          alt="Loading..."
                          className="w-full h-full object-contain rounded-lg"
                        />
                      )}
                    </div>
                    <div className="truncate flex items-center">
                      <span className="truncate w-28 sm:w-48">{song.name}</span>
                      <span className="truncate pl-2 w-28 sm:w-40">
                        {song.artist.name}
                      </span>
                    </div>
                  </div>

                  <div className="pr-2 flex gap-4">
                    <div
                      onClick={() => {
                        setAddingSongId(song._id);
                        setaddSongPlaylist(true);
                      }}
                      className="p-2 rounded-full flex justify-end text-xl hover:text-[#894aff] select-none cursor-pointer"
                    >
                      <FaPlus />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
