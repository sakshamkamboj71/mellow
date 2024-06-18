import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { useSelector } from "react-redux";

const SongPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const [songPlaying, setsongPlaying] = useState(true);

  const audioRef = useRef();

  const singleSong = useSelector((state) => state.songInfo.singleSong);
  const image = useSelector((state) => state.getDefaultDisk);

  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (songPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setsongPlaying(!songPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      const newVolume = e.target.value;
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    setCurrentTime(0);
    setsongPlaying(true);
  }, [singleSong]);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  return (
    <div className="fixed bottom-0 h-26 w-full z-50 bg-[#0f0f0f] border-t-2 border-[#323232]">
      <div className="p-0 slider flex justify-center items-center px-2">
        <input
          type="range"
          title=""
          className="w-full rounded-lg cursor-pointer"
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
        />
      </div>
      <div className="w-full h-20 flex justify-between">
        <div className="w-1/2 p-2 flex items-center">
          <div className="w-12 h-12 shrink-0 text-2xl flex select-none">
            <div
              onClick={handlePlayPause}
              className="w-full flex text-2xl justify-center items-center hover:bg-[#323232] h-full"
            >
              {songPlaying ? <FaPause /> : <FaPlay />}
            </div>
          </div>
          <div className="flex-grow flex ml-4 p-1 bg-[#1f1f1f] rounded-lg select-none">
            <div className="w-12 h-12 bg-[#1f1f1f]">
              {singleSong?.image ? (
                <img
                  src={singleSong.image}
                  alt="hehe"
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
            <div className="ml-2">
              <div className="text-lg">
                <div>{singleSong?.name}</div>
                <div className="text-xs">{singleSong?.artist?.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <div className="slider flex justify-between items-center space-x-4 w-52 mr-4">
            <div className="text-3xl hover:bg-[#323232] p-2 rounded-full">
              <FaVolumeHigh />
            </div>
            <input
              type="range"
              className="border-2 border-[#323232] w-36 h-2 bg-[#1f1f1f] rounded-md overflow-hidden appearance-none cursor-pointer"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full absolute bottom-0">
        <audio
          ref={audioRef}
          className="w-1/2"
          src={singleSong.songFile}
          autoPlay
        />
      </div>
    </div>
  );
};

export default SongPlayer;
