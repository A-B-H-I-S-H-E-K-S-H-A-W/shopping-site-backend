import { User } from "../models/users.models";
import Decrypt from "../utils/Decrypt.js";
import Encrypt from "../utils/Encrypt.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        statusCode: 400,
      });
    }

    const hashedPassword = await Encrypt(password);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const UserData = newUser.toObject();
    delete UserData.password;

    return res.status(201).json({
      success: true,
      message: "User successfully registered",
      statusCode: 201,
      data: UserData,
    });
  } catch (error) {
    console.log("Error registering the user ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        statusCode: 401,
      });
    }

    const isMatch = await Decrypt(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Enter correct password!",
        statusCode: 400,
      });
    }

    const token = jwt.sign({});

    
  } catch (error) {
    console.log("Error loggingin ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
