import express from "express";
import {
  checkTokenValidity,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-validity", checkTokenValidity);

export { router as userRouter };
