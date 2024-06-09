import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LongSidebar from "./components/LongSidebar";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import MaybeShowSidebar from "./components/MaybeShowSidebar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Albums from "./pages/Albums";
import AudioPlayer from "./pages/AudioPlayer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import Register from "./pages/Register";
import ViewPlaylist from "./pages/ViewPlaylist";
import ArtistHome from "./pages/artist/ArtistHome";
import Dashboard from "./pages/artist/Dashboard";
import { changeUserInfo } from "./services/actions/action";

function App() {
  const [type, setType] = useState("");
  const [validity, setValidity] = useState(false);

  useEffect(() => {
    setType(window.localStorage.getItem("type"));

    checkValidity();
  }, []);

  useEffect(() => {
    checkValidity();
  }, [type]);
  const checkValidity = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/user-auth/check-validity",
        {
          token,
        }
      );

      setValidity(response.data.validity);
    } catch (err) {
      setValidity(err.response.data.validity);
    }
  };

  const myState = useSelector((state) => state.toggleLongSidebar);
  const song = useSelector((state) => state.songInfo);
  const [userPlaylists, setUserPlaylists] = useState([]);

  // useEffect(() => {
  //   console.log(song);
  // }, [song]);

  const dispatch = useDispatch();

  const fetchPlaylists = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/playlists/fetch-playlist-user",
        {
          token,
        }
      );
      setUserPlaylists(response.data.playlists);
    } catch (err) {}
  };

  const fetchUserData = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/user-auth/get-user-data",
        {
          token,
        }
      );
      dispatch(changeUserInfo(response.data.user));
    } catch (err) {}
  };

  useEffect(() => {
    fetchPlaylists();
    fetchUserData();
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <MaybeShowNavbar>
          <Navbar type={type} setType={setType} setValidity={setValidity} />
        </MaybeShowNavbar>

        <MaybeShowSidebar type={type}>
          {myState ? (
            <LongSidebar userPlaylists={userPlaylists} />
          ) : (
            <Sidebar />
          )}
        </MaybeShowSidebar>

        {song.songPlaying && <AudioPlayer />}

        <Routes>
          {type === "user" && (
            <>
              <Route path="/" element={<Home />}>
                <Route path="/" element={<Playlists />} />
                <Route path="/playlist/:id" element={<ViewPlaylist />} />
                <Route path="/albums" element={<Albums />} />
              </Route>
            </>
          )}

          {type === "artist" && (
            <>
              <Route path="/" element={<ArtistHome />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
            </>
          )}

          {!validity && (
            <>
              <Route path="*" element={<Login setType={setType} />} />
              <Route path="/login" element={<Login setType={setType} />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
