import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { default as React, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Message from "./Message";

const UploadSong = ({ setUploadSong }) => {
  const [value, setValue] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setValue(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImgUrl(downloadURL);
          setValue(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleAudioUpload = (e) => {
    const selectedFile = e.target.files[0];
    setValue(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setAudioUrl(downloadURL);
          setValue(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleSongUpload = async () => {
    if (name === "") {
      setError("Please provide a name");
      return;
    }
    if (audioUrl === "") {
      setError("Please provide an mp3 audio file");

      return;
    }

    try {
      const duration = Math.floor(audioRef.current.duration);
      const token = window.localStorage.getItem("token");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/songs/add-song",
        {
          name,
          token,
          image: imgUrl,
          songFile: audioUrl,
          duration,
        }
      );

      setLoading(false);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        setUploadSong(false);
      }, 1000);
    } catch (err) {
      return;
    }
  };

  const image = useSelector((state) => state.getDefaultDisk);
  const audioRef = useRef();

  if (value) {
    return (
      <div className="fixed top-0 w-full h-screen z-50 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
        <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
          <div className="w-full flex justify-center items-center text-xl md:text-2xl">
            <h1>Uploading ... </h1>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (message) {
    return <Message text="Song Uploaded" />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="p-4 w-1/3 bg-[#1f1f1f] rounded-lg text-white">
        <div className="w-full flex justify-center text-2xl mb-2">
          Upload Song
        </div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder=". . ."
          className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="text-sm sm:text-base md:text-lg mt-2 mb-2">
          <h1 className="mb-2 pl-1">Upload image : </h1>
          <input
            type="file"
            className="text-stone-500
              file:mr-5 file:py-1 file:px-3 file:font-medium
              file:bg-[#323232] file:text-white
              hover:file:cursor-pointer hover:file:bg-[#4a4a4a]
               file:rounded-l-md file:outline-none file:border-none file:py-2 w-full"
            onChange={handleFileUpload}
            accept="image/*"
          />
        </div>

        <div className="w-full h-32 rounded-lg bg-[#1f1f1f] mb-2">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="User playlist"
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

        <div className="text-sm sm:text-base md:text-lg mt-2 mb-2">
          <h1 className="mb-2 pl-1">Upload audio file (mp3) : </h1>
          <input
            type="file"
            className="text-stone-500
              file:mr-5 file:py-1 file:px-3 file:font-medium
              file:bg-[#323232] file:text-white
              hover:file:cursor-pointer hover:file:bg-[#4a4a4a]
               file:rounded-l-md file:outline-none file:border-none file:py-2 w-full"
            onChange={handleAudioUpload}
            accept="audio/mp3"
          />
        </div>

        {audioUrl && (
          <div className="w-full flex justify-center items-center mt-4">
            <audio className="w-full" ref={audioRef} src={audioUrl} controls />
          </div>
        )}

        <div className="w-full flex justify-between select-none mt-4">
          <div
            onClick={() => setUploadSong(false)}
            className="p-2 w-32 flex justify-center items-center bg-[#323232] rounded-md cursor-pointer"
          >
            Cancel
          </div>
          <div
            onClick={() => handleSongUpload()}
            className="p-2 w-32 flex justify-center items-center bg-[#894aff] rounded-md cursor-pointer"
          >
            Save
          </div>
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

export default UploadSong;
