import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    songFile: { type: String, required: true },
    image: { type: String },
    duration: { type: Number },
    likes: { type: Number },
    language: { type: String },
  },
  { timestamps: true }
);

export const SongModel = mongoose.model("songs", SongSchema);
