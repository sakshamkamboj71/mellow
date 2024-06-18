import express from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  deleteSongFromPlaylist,
  fetchAllPlaylist,
  fetchPlaylist,
  fetchPlaylistOfUser,
  updatePlaylistImage,
  updatePlaylistName,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/create-playlist", createPlaylist);
router.put("/add-song-to-playlist", addSongToPlaylist);
router.post("/fetch-all-playlist", fetchAllPlaylist);
router.post("/fetch-playlist", fetchPlaylist);
router.post("/fetch-playlist-user", fetchPlaylistOfUser);
router.put("/update-playlist-name", updatePlaylistName);
router.put("/update-playlist-image", updatePlaylistImage);
router.patch("/delete-song-from-playlist", deleteSongFromPlaylist);

export { router as playlistRouter };
