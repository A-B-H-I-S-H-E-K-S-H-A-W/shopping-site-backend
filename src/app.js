import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
               