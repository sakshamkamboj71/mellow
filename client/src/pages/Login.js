import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //email
    if (email === "") {
      setError("Email cannot be empty");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    //password
    if (password === "") {
      setError("Please enter a password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user-auth/login",
        {
          email,
          password,
        }
      );

      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("type", response.data.type);

      setType(response.data.type);

      navigate("/");
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

      <h1 className="text-center text-3xl my-4 select-none">Login</h1>
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder=". . ."
            className="w-full bg-[#141414] p-2 mb-2 rounded-md outline-none border-none"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center p-2">
            <button className="p-2 px-6 rounded-md bg-[#3A0078] hover:bg-[#5E1ED4]">
              Submit
            </button>
          </div>

          <div className=" flex">
            <p
              onClick={() => navigate("/register")}
              className="select-none cursor-pointer hover:text-[#5E1ED4]"
            >
              Do not have an account ?
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

export default Login;
