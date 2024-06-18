import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const registerUser = async (req, res) => {
  const { username, name, email, password, type } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const usermail = await UserModel.findOne({ email });

    if (usermail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verified = false;

    const newUser = await UserModel.create({
      username,
      name,
      email,
      verified,
      password: hashedPassword,
      type,
      profilePic: "",
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ error: "Email and passwrod do not match" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    return res
      .status(200)
      .json({ message: "Login successfull", token, type: user.type });
  } catch (err) {
    return res.status(501).json({ error: "Invalid Access" });
  }
};

export const checkTokenValidity = async (req, res) => {
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
      return res.status(401).json({ error: "Invalid Access", validity: false });
    }

    return res.status(200).json({ message: "Success", validity: true });
  } catch (err) {
    return res.status(400).json({ error: "Not logged in", validity: false });
  }
};

export const getUserData = async (req, res) => {
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

    const user = await UserModel.findById(decoded);

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Not logged in" });
  }
};
