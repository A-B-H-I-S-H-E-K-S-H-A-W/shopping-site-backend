import { Router } from "express";
import {
  createChildCategory,
  createParentCategory,
  updateCategory,
} from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/create-parent", createParentCategory);
categoryRouter.post("/create-child", createChildCategory);
categoryRouter.put("/update/:id", updateCategory);
