import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ViewPlaylist = () => {
  const params = useParams();

  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPlaylist = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8000/playlists/fetch-playlist",
      {
        token,
        playlistId: params.id,
      }
    );

    if (response.status === 200) {
      setPlaylist(response.data.playlist);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const image = useSelector((state) => state.getDefaultDisk);

  const secondsToTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const min = mins < 10 ? "0" + mins : mins;

    const secs = seconds % 60;
    const sec = secs < 10 ? "0" + secs : secs;

    return min + ":" + sec;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex p-2 justify-center overflow-y-auto">
      <div className="w-11/12 flex flex-col h-fit">
        <div className="w-full py-4 flex gap-4">
          <div className="w-52 h-52 rounded-lg bg-[#1f1f1f]">
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
          <div className="flex flex-col justify-between py-2">
            <div>
              <div className="text-2xl font-semibold">{playlist.name}</div>
              <div>@{playlist.user?.username}</div>
              <div>{playlist.length} songs</div>
            </div>
            <div>
              <div className="p-2 rounded-md bg-[#894aff] select-none cursor-pointer hover:bg-[#5E1ED4]">
                Edit Playlist
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          {playlist.songs.map((song) => {
            return (
              <div className="w-full my-1 bg-[#1f1f1f] hover:bg-[#323232] select-none cursor-pointer p-1 flex justify-between items-center rounded-md">
                <div className="flex gap-2">
                  <div className="w-8 h-8 m-1 bg-[#1f1f1f]">
                    <img
                      src={song.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-64 truncate flex items-center">
                    {song.name}
                  </div>
                </div>

                <div className="pr-2">{secondsToTime(song.duration)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewPlaylist;
