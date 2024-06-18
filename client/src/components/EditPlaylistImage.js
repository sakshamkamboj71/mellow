import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { default as React, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Message from "./Message";

const EditPlaylistImage = ({ setPlaylistImg, playlistId }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [value, setValue] = useState(false);

  const image = useSelector((state) => state.getDefaultDisk);

  const handleCancelClick = (e) => {
    if (e.target === e.currentTarget) {
      setPlaylistImg(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/playlists/update-playlist-image",
        {
          token,
          playlistId,
          imgUrl,
        }
      );

      setMessage(true);

      setTimeout(() => {
        setMessage(false);
        setPlaylistImg(false);
      }, 1000);
    } catch (err) {}
  };

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
    return <Message text="Playlist Image Changed" />;
  }

  return (
    <div
      onClick={handleCancelClick}
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    >
      <div className="p-4 w-1/3 bg-[#1f1f1f] rounded-lg text-white">
        <div className="w-full flex justify-center text-2xl mb-2 relative">
          Edit Playlist Image
        </div>

        <form onSubmit={handleSubmit} className="w-full rounded-xl">
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

          <div className="w-full flex justify-between select-none mt-4">
            <div
              onClick={() => setPlaylistImg(false)}
              className="p-2 w-24 flex justify-center items-center bg-[#323232] rounded-md cursor-pointer"
            >
              Cancel
            </div>
            <button className="p-2 w-24 flex justify-center items-center bg-[#894aff] rounded-md cursor-pointer hover:bg-[#5E1ED4]">
              Save
            </button>
          </div>
        </form>

        {error && (
          <div className="flex justify-center items-center mt-2">
            <div className="p-2 text-[#894aff]">**{error}**</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPlaylistImage;
