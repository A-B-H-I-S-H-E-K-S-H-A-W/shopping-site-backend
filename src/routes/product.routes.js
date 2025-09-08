import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.get("/all-products/", getAllProducts);
productRouter.get("/:id", getProductById);
