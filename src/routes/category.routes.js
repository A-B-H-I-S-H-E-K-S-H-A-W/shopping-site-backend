import { Router } from "express";
import {
  createChildCategory,
  createParentCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.post("/create-parent", createParentCategory);
categoryRouter.post("/create-child", createChildCategory);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
categoryRouter.get("/all-categories", getAllCategories);
categoryRouter.get("/item/:id", getCategoryById);
