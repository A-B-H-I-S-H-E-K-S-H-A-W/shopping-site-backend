import { Router } from "express";
import { createCategory } from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
