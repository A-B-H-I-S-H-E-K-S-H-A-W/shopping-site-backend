import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.post("/create", createProduct);
