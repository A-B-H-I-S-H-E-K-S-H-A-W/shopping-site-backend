import { Router } from "express";
import { login } from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.post("/login", login);
