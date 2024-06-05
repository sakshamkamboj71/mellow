import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LongSidebar from "./components/LongSidebar";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Albums from "./pages/Albums";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import Register from "./pages/Register";
import ViewPlaylist from "./pages/ViewPlaylist";

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
  const [userPlaylists, setUserPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8000/playlists/fetch-playlist-user",
      {
        token,
      }
    );

    if (response.status === 200) {
      setUserPlaylists(response.data.playlists);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <MaybeShowNavbar validity={validity}>
          <Navbar type={type} setType={setType} setValidity={setValidity} />
          {myState ? (
            <LongSidebar userPlaylists={userPlaylists} />
          ) : (
            <Sidebar />
          )}
        </MaybeShowNavbar>

        <Routes>
          {type === "user" && (
            <>
              <Route path="/" element={<Home />}>
                <Route path="/" element={<Playlists />} />
                <Route path="/playlist/:id" element={<ViewPlaylist />} />
                <Route path="/albums" element={<Albums />} />
              </Route>
              <Route path="/albums" element={<Albums />} />
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
