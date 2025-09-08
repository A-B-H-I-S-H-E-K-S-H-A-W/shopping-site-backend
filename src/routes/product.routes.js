import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";

export const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.delete("/delete/:id", deleteCategory);
