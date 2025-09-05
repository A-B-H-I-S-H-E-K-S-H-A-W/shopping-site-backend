import { model, Schema } from "mongoose";

const tokenSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const Token = model("Token", tokenSchema);
