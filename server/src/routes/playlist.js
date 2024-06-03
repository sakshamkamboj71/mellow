import express from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  fetchAllPlaylist,
  fetchPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/create-playlist", createPlaylist);
router.put("/add-song-to-playlist", addSongToPlaylist);
router.post("/fetch-all-playlist", fetchAllPlaylist);
router.post("/fetch-playlist", fetchPlaylist);

export { router as playlistRouter };
