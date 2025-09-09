import { model, Schema } from "mongoose";

const adminSchema = Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export const Admin = model("Admin", adminSchema);
