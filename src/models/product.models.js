import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
    variants: [
      {
        size: String,
        color: String,
        price: Number,
        stock: Number,
      },
    ],
    tags: [{ type: String }],
    currency: { type: String, default: "INR" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    brand: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
