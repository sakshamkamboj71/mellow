import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { playlistRouter } from "./routes/playlist.js";
import { songRouter } from "./routes/songs.js";
import { userRouter } from "./routes/users.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user-auth", userRouter);
app.use("/songs", songRouter);
app.use("/playlists", playlistRouter);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Database connection successful");
});

app.listen(8000, () => {
  console.log("Server connected successfully");
});
