import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import { categoryRouter } from "./routes/category.routes.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);
