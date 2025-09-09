import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { adminRouter } from "./routes/admin.routes.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
