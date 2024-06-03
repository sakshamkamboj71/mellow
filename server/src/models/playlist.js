import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    image: { type: String },
    length: { type: Number },
    songs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "songs", required: true },
    ],
    privacy: { type: String, required: true },
  },
  { timestamps: true }
);

export const PlaylistModel = mongoose.model("playlists", PlaylistSchema);
