import jwt from "jsonwebtoken";
import { SongModel } from "../models/song.js";
import { UserModel } from "../models/user.js";

export const addSong = async (req, res) => {
  const { name, token, songFile, image, duration, language } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return undefined;
      } else {
        return data.id;
      }
    });

    if (!decoded) {
      return res.status(501).json({ error: "Invalid Access" });
    }

    const user = await UserModel.findById({ _id: decoded });

    if (user.type !== "artist") {
      return res
        .status(403)
        .json({ error: "Only an artist can create a song" });
    }

    if (duration > 1200) {
      return res
        .status(400)
        .json({ error: "Song duration cannot be more than 20 minutes" });
    }

    const newSong = await SongModel.create({
      name,
      artist: decoded,
      songFile,
      image,
      duration,
      likes: 0,
      language,
    });

    await newSong.save();

    return res.status(201).json({ message: "Song Added" });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchAllSongs = async (req, res) => {
  try {
    const songs = await SongModel.find({});

    return res.status(200).json({ songs });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchArtistSongs = async (req, res) => {
  const { token, artistId } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return undefined;
      } else {
        return data.id;
      }
    });

    if (!decoded) {
      return res.status(501).json({ error: "Invalid Access" });
    }

    const songs = await SongModel.find({ artist: artistId });

    return res.status(200).json({ songs });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const likeSong = async (req, res) => {
  const { token, songId } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return undefined;
      } else {
        return data.id;
      }
    });

    if (!decoded) {
      return res.status(501).json({ error: "Invalid Access" });
    }

    const user = await UserModel.findById({ _id: decoded });

    if (user.type !== "user") {
      return res.status(403).json({ error: "Only a user can like a song" });
    }

    const song = await SongModel.findOne({ _id: songId });

    const likes = song.likes + 1;

    await SongModel.findByIdAndUpdate(
      { _id: songId },
      { likes },
      { new: true }
    );

    return res.status(200).json({ message: "Added a like" });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};
