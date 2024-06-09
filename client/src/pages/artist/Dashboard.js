import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadSong from "../../components/UploadSong";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [uploadSong, setUploadSong] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/songs/fetch-artist-own-songs",
        { token }
      );
      setSongs(response.data.songs);
    } catch (err) {}
  };

  return (
    <>
      {uploadSong && <UploadSong setUploadSong={setUploadSong} />}

      <div className="flex w-full h-full">
        <div className="w-1/2 flex flex-col px-2 border-2 enableScroll">
          <div className="h-1/2 bg-[#1f1f1f] mt-4 mb-2 rounded-xl p-2">
            <div className="w-full text-center text-2xl border-b-2 px-2 mb-2">
              Profile
            </div>
          </div>
          <div className="h-1/2 w-full my-2 mb-4 flex flex-wrap">
            <div
              onClick={() => setUploadSong(true)}
              className="bg-[#1f1f1f] w-11/12 h-3/4 flex items-center justify-center cursor-pointer hover:text-[#894aff] rounded-lg"
            >
              Upload Song
            </div>
          </div>
        </div>
        {/* button card */}

        {/* {/* SONGS CARD */}
        <div className="w-1/2 p-4">
          <div className="bg-[#1f1f1f] w-full h-full rounded-xl p-2 enableScroll">
            <div className="w-full text-center text-2xl border-b-2 px-2 mb-2">
              My Songs
            </div>
            {songs.map((song, ind) => {
              return (
                <div
                  key={ind}
                  className="w-full select-none cursor-pointer p-1 hover:bg-[#323232] rounded-md"
                >
                  {song.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
