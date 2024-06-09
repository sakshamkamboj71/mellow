import jwt from "jsonwebtoken";
import { PlaylistModel } from "../models/playlist.js";
import { UserModel } from "../models/user.js";

export const createPlaylist = async (req, res) => {
  const { token, name, image, privacy } = req.body;

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

    const user = await UserModel.findOne({ _id: decoded });

    if (user.type !== "user") {
      return res
        .status(403)
        .json({ error: "Only a user can create a playlist" });
    }

    const checkPlaylistName = await PlaylistModel.findOne({ name });

    if (checkPlaylistName) {
      return res
        .status(400)
        .json({ error: "Please enter a unique playlist name" });
    }

    const newPlaylist = await PlaylistModel.create({
      name,
      user: decoded,
      image,
      length: 0,
      songs: [],
      privacy,
    });

    await newPlaylist.save();

    return res.status(201).json({ message: "Playlist Created" });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const addSongToPlaylist = async (req, res) => {
  const { token, songId, playlistId } = req.body;

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

    const playlist = await PlaylistModel.findOne({ _id: playlistId });

    if (decoded !== playlist.user.toString()) {
      return res.status(401).json({
        error: "You can add song to only your playlist",
      });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ error: "Song is already in the playlist" });
    }

    const songs = [...playlist.songs, songId];

    const newPlaylist = await PlaylistModel.findByIdAndUpdate(
      { _id: playlistId },
      { songs, length: playlist.length + 1 },
      { new: true }
    );

    return res.status(201).json({ message: "Successfully added the song" });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchAllPlaylist = async (req, res) => {
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

    const playlists = await PlaylistModel.find({ privacy: "public" });

    return res.status(200).json({ playlists });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchPlaylist = async (req, res) => {
  const { token, playlistId } = req.body;

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

    const playlist = await PlaylistModel.findOne({ _id: playlistId })
      .populate("songs")
      .populate("songs.artist")
      .populate("user");

    return res.status(200).json({ playlist });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const fetchPlaylistOfUser = async (req, res) => {
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

    const playlists = await PlaylistModel.find({ user: decoded });

    return res.status(200).json({ playlists });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const updatePlaylistName = async (req, res) => {
  const { token, playlistId, newName } = req.body;

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

    const playlist = await PlaylistModel.findById(playlistId);

    if (decoded !== playlist.user.toString()) {
      return res.status(401).json({
        error: "You can edit only your playlists",
      });
    }

    await PlaylistModel.findByIdAndUpdate(
      playlistId,
      { name: newName },
      { new: true }
    );

    return res.status(200).json({ message: "Playlist Name Updated" });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};
