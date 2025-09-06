import { Router } from "express";
import {
  createCategory,
  updateCategory,
} from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.put("/update/:id", updateCategory);
