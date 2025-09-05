import { Token } from "../models/token.models.js";
import { User } from "../models/users.models";
import Decrypt from "../utils/Decrypt.js";
import jwt from "jsonwebtoken";
import Encrypt from "../utils/Encrypt.js";
import {
  generateUserAccessToken,
  generateUserRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

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

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone is required!",
        statusCode: 400,
      });
    }

    const query = [];
    if (email) query.push({ email });
    if (phone) query.push({ phone });

    const user = await User.findOne({ $or: query });

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

    const accessToken = generateUserAccessToken(user);
    const refreshToken = generateUserRefreshToken(user);

    await Token.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "Loggedin successfully",
      statusCode: 200,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("Error loggingin ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required!",
        statusCode: 401,
      });
    }

    const storedToken = await Token.findOne({ token: refreshToken });

    if (!storedToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token!",
        statusCode: 403,
      });
    }

    const { valid, decoded, error } = verifyRefreshToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET_USER
    );

    if (!valid) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
        statusCode: 403,
      });
    }

    const newAccessToken = generateUserAccessToken(decoded.id);

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token :::", error);
    res.status(500).json({ message: "Server error" });
  }
};
