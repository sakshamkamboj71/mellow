import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSong from "../components/AddSong";
import EditPlaylistImage from "../components/EditPlaylistImage";
import EditPlaylistName from "../components/EditPlaylistName";
import SoftLoading from "../components/SoftLoading";

import {
  changeFolder,
  changeSingleSong,
  changeSong,
} from "../services/actions/action";

import { FaTrash } from "react-icons/fa";

const ViewPlaylist = () => {
  const params = useParams();

  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(true);
  const [addSong, setAddSong] = useState(false);
  const [currentSongs, setcurrentSongs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [playlistName, setPlaylistName] = useState(false);
  const [playlistImg, setPlaylistImg] = useState(false);
  const [deleteSongs, setDeleteSongs] = useState(false);

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
  }, [refresh, params]);

  const image = useSelector((state) => state.getDefaultDisk);
  const userInfo = useSelector((state) => state.userInfo);
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
    dispatch(changeSingleSong(null));
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

  const handleDeletePlaylist = async (e, ind) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:8000/playlists/delete-song-from-playlist",
        {
          token,
          playlistId: playlist._id,
          songId: e,
        }
      );

      fetchPlaylist();
      if (playlist.length === 1) {
        dispatch(changeFolder(null));
        dispatch(changeSong(null));
      } else {
        dispatch(changeFolder(playlist));
        if (ind === 0) {
          dispatch(
            changeSong({
              song: playlist.songs[1].songFile,
              songInd: 1,
            })
          );
        } else {
          dispatch(
            changeSong({
              song: playlist.songs[0].songFile,
              songInd: 0,
            })
          );
        }
      }
    } catch (err) {}
  };

  if (loading) {
    return <SoftLoading />;
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
      {playlistName && (
        <EditPlaylistName
          setPlaylistName={setPlaylistName}
          playlistId={playlist._id}
        />
      )}
      {playlistImg && (
        <EditPlaylistImage
          setPlaylistImg={setPlaylistImg}
          playlistId={playlist._id}
        />
      )}
      <div className="w-full h-full flex p-2 justify-center overflow-y-auto pb-32 mb-24">
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
              <div className="">
                <div className="text-2xl font-semibold flex items-center gap-2">
                  <div className="overflow-hidden max-w-64">
                    <p className="truncate">{playlist.name}</p>
                  </div>
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
              {userInfo._id === playlist.user._id && (
                <div className="flex gap-2">
                  <div
                    onClick={() => setPlaylistName(true)}
                    className="p-2 w-12 h-12 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] text-2xl flex justify-center items-center"
                  >
                    <MdEdit />
                  </div>
                  <div
                    onClick={() => setPlaylistImg(true)}
                    className="p-2 w-12 h-12 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] text-2xl flex justify-center items-center"
                  >
                    <RiImageEditFill />
                  </div>
                  <div
                    onClick={() => setDeleteSongs(!deleteSongs)}
                    className="p-2 w-12 h-12 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] text-xl flex justify-center items-center"
                  >
                    <FaTrash />
                  </div>
                  <div
                    onClick={() => setAddSong(true)}
                    className="p-2 px-4 rounded-full bg-[#894aff] select-none text-center cursor-pointer hover:bg-[#5E1ED4] flex justify-center items-center"
                  >
                    Add Song
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            {currentSongs.length === 0 && (
              <div className="w-full my-1 bg-[#1f1f1f] text-xl p-4 flex justify-center items-center rounded-md ">
                No songs found
              </div>
            )}
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
                    <div className="w-28 sm:w-64 truncate flex items-center">
                      <span className="truncate">{song.name}</span>
                    </div>
                  </div>

                  <div className="pr-2 flex gap-4">
                    <div className="w-14 flex justify-end">
                      {deleteSongs ? (
                        <div
                          onClick={() => handleDeletePlaylist(song._id, ind)}
                          className="p-2 text-[#894aff]"
                        >
                          <FaTrash />
                        </div>
                      ) : (
                        <div>{secondsToTime(song.duration)}</div>
                      )}
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
