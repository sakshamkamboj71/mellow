import express from "express";
import {
  addSong,
  fetchAllSongs,
  fetchArtistSongs,
  likeSong,
} from "../controllers/songController.js";

const router = express.Router();

router.post("/add-song", addSong);
router.get("/fetch-all-songs", fetchAllSongs);
router.post("/fetch-artist-songs", fetchArtistSongs);
router.put("/like-song", likeSong);

export { router as songRouter };
