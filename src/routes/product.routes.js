import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.put("/update/:id", updateProduct);
