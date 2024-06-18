import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("user");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setError("Email cannot be empty");
      return;
    }

    if (username === "") {
      setError("Username cannot be empty");
      return;
    }

    if (name === "") {
      setError("Name cannot be empty");
      return;
    }

    if (password === "") {
      setError("Please provide a password");
      return;
    }

    if (confirm === "") {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user-auth/register",
        {
          username,
          name,
          email,
          password,
          type,
        }
      );

      navigate("/login");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen w-full p-2 flex flex-col items-center">
      <div className="text-4xl tracking-wider w-full flex justify-center gap-4 items-center font-semibold bg-[#0d0d0d] select-none mb-20">
        <div className="w-16 h-16 block md:hidden">
          <img
            src="mellowLogo.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div>MELLOW</div>
      </div>

      <h1 className="text-center text-3xl my-4 select-none">Register</h1>
      <div className="bg-[#1f1f1f] p-8 flex w-full lg:w-3/4 xl:w-1/2 rounded-lg mb-6">
        <div className="w-1/2 flex justify-center items-center hidden md:flex">
          <div className="w-64 h-64">
            <img
              src="mellowLogo.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 h-full flex flex-col justify-center"
        >
          <label>Email:</label>
          <input
            type="email"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username:</label>
          <input
            type="text"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Name:</label>
          <input
            type="text"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <select
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
          >
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>
          <div className="flex justify-center p-2">
            <button className="p-2 px-6 rounded-md bg-[#3A0078] hover:bg-[#5E1ED4]">
              Submit
            </button>
          </div>

          <div className=" flex">
            <p
              onClick={() => navigate("/login")}
              className="select-none cursor-pointer hover:text-[#5E1ED4]"
            >
              Already have an account ?
            </p>
          </div>
        </form>
      </div>
      {error && (
        <div className="text-[#894aff] p-2 rounded-md">**{error}**</div>
      )}
    </div>
  );
};

export default Register;
