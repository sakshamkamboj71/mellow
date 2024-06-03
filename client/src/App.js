import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import Navbar from "./components/Navbar";
import Albums from "./pages/Albums";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Playlists from "./pages/Playlists";
import Register from "./pages/Register";

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

  return (
    <div className="App">
      <Router>
        <MaybeShowNavbar validity={validity}>
          <Navbar type={type} setType={setType} setValidity={setValidity} />
        </MaybeShowNavbar>

        <Routes>
          {type === "user" && (
            <>
              <Route path="/" element={<MainPage validity={validity} />}>
                <Route path="/" element={<Playlists />} />
                <Route path="/albums" element={<Albums />} />
              </Route>
              <Route path="/albums" element={<Albums />} />
            </>
          )}

          {!validity && (
            <>
              <Route path="/" element={<Login setType={setType} />} />
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
