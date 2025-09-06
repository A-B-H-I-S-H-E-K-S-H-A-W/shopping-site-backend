import { Router } from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";
export const userRouter = Router();

//Auth
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", () => {});
userRouter.post("/refresh", refreshAccessToken);

//User
userRouter.get("/user", (req, res) => {
  res.send("Get Profile Detail");
});
userRouter.put("/user", (req, res) => {
  res.send("Update Profile Detail");
});
userRouter.post("/user/:id", (req, res) => {
  res.send("Get User Profile Data by admin");
});
userRouter.post("/delete/:id", (req, res) => {
  res.send("Delete User Profile Data by admin");
});
