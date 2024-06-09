import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    profilePic: { type: String },
    likedSongs: [{ type: String }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
