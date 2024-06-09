import express from "express";
import {
  addSong,
  fetchAllSongs,
  fetchArtistOwnSongs,
  fetchArtistSongs,
  fetchQuerySongs,
} from "../controllers/songController.js";

const router = express.Router();

router.post("/add-song", addSong);
router.get("/fetch-all-songs", fetchAllSongs);
router.post("/fetch-artist-songs", fetchArtistSongs);
router.post("/fetch-artist-own-songs", fetchArtistOwnSongs);
router.post("/fetch-query-songs/:query", fetchQuerySongs);

export { router as songRouter };
