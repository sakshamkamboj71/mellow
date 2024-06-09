import express from "express";
import {
  checkTokenValidity,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-validity", checkTokenValidity);
router.post("/get-user-data", getUserData);

export { router as userRouter };
