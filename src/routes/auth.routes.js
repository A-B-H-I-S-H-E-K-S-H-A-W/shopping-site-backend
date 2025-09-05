import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
export const userRouter = Router();

//Auth
userRouter.post("/register", registerUser);
userRouter.post("/login", (req, res) => {
  res.send("Login Account");
});
userRouter.post("/logout", (req, res) => {
  res.send("Logout Account");
});

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
