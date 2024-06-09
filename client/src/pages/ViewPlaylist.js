import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSong from "../components/AddSong";
import Loading from "../components/Loading";
import { changeFolder, changeSong } from "../services/actions/action";

const ViewPlaylist = () => {
  const params = useParams();

  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(true);
  const [addSong, setAddSong] = useState(false);
  const [currentSongs, setcurrentSongs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [sort, setSort] = useState(false);

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
      setPlaylist(response.data?.playlist);
      setcurrentSongs(response.data?.playlist?.songs);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  useEffect(() => {
    fetchPlaylist();
  }, [refresh]);

  const image = useSelector((state) => state.getDefaultDisk);
  const dispatch = useDispatch();

  const secondsToTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const min = mins < 10 ? "0" + mins : mins;

    const secs = seconds % 60;
    const sec = secs < 10 ? "0" + secs : secs;

    return min + ":" + sec;
  };

  const songInfo = useSelector((state) => state.songInfo);
  const changeSongInfo = (e, ind) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    if (songInfo.folderPlaying !== playlist._id) {
      dispatch(changeFolder(playlist));
    }
    if (songInfo.songPlaying !== e) {
      dispatch(
        changeSong({
          song: e,
          songInd: ind,
        })
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {addSong && (
        <AddSong
          setAddSong={setAddSong}
          currentSongs={currentSongs}
          playlistId={playlist._id}
        />
      )}
      <div className="w-full h-screen flex p-2 justify-center overflow-y-auto pb-40">
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
                <div className="text-2xl font-semibold flex items-center gap-2">
                  <div>{playlist.name}</div>
                  <div
                    onClick={() => setRefresh(!refresh)}
                    className="hover:bg-[#323232] p-1 rounded-full"
                  >
                    <IoMdRefresh />
                  </div>
                </div>
                <div>@{playlist.user?.username}</div>
                <div>{playlist.length} songs</div>
              </div>
              <div className="flex gap-2">
                <div className="p-2 w-12 h-12 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] text-2xl flex justify-center items-center">
                  <MdEdit />
                </div>
                <div
                  onClick={() => setAddSong(true)}
                  className="p-2 px-4 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] flex justify-center items-center"
                >
                  Add Song
                </div>
                <div
                  onClick={() => setSort(!sort)}
                  className="p-2 px-4 select-none text-center cursor-pointer flex justify-center items-center relative"
                >
                  <div>Sort By</div>
                  {sort && (
                    <div className="bg-[#0f0f0f] absolute w-32 top-[100%] left-0 border-[1px]">
                      <div
                        onClick={() => {
                          setcurrentSongs(playlist?.songs?.slice().reverse());
                        }}
                        className="py-1 px-2 hover:bg-[#323232] text-left"
                      >
                        Latest added
                      </div>
                      <div
                        onClick={() => {
                          setcurrentSongs(playlist?.songs);
                        }}
                        className="py-1 px-2 hover:bg-[#323232] text-left"
                      >
                        Oldest added
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            {currentSongs.map((song, ind) => {
              return (
                <div
                  key={ind}
                  onClick={() => changeSongInfo(song.songFile, ind)}
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
                    <div className="w-64 truncate flex items-center">
                      {song.name}
                    </div>
                  </div>

                  <div className="pr-2 flex gap-4">
                    <div className="w-14 flex justify-end">
                      {secondsToTime(song.duration)}
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

export default ViewPlaylist;
