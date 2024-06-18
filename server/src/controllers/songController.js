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
    });

    await newSong.save();

    return res.status(201).json({ message: "Song Added" });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchAllSongs = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return undefined;
      } else {
        return data.id;
      }
    });

    if (!decoded) {
      return res.status(401).json({ error: "Invalid Access" });
    }

    const songs = await SongModel.find({}).populate("artist", "name");

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

export const fetchArtistOwnSongs = async (req, res) => {
  const { token } = req.body;
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

    const songs = await SongModel.find({ artist: decoded });

    return res.status(200).json({ songs });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchQuerySongs = async (req, res) => {
  const { token } = req.body;
  const { query } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return undefined;
      } else {
        return data.id;
      }
    });

    if (!decoded) {
      return res.status(401).json({ error: "Invalid Access" });
    }

    const songs = await SongModel.find({
      name: { $regex: query, $options: "i" },
    });

    return res.status(200).json({ message: "Completed", songs });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};
