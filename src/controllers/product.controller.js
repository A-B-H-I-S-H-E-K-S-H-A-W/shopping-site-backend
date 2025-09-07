import { Product } from "../models/product.models";
import { MultipleFileUploader } from "../services/cloudinary";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category, // object
      stock, // Stock
      variants, // array of objects
      tags, // array of string
      currency,
      metaTitle,
      metaDescription,
      brand,
      isActive,
    } = req.body;
    const { images } = req.files;

    if (
      !name ||
      !description ||
      !category ||
      !stock ||
      !variants ||
      !tags ||
      !currency ||
      !metaTitle ||
      !metaDescription ||
      !brand ||
      !images ||
      !isActive
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        statusCode: 400,
      });
    }

    if (!Array.isArray(variants)) {
      return res.status(400).json({
        success: false,
        message: "Variants cannot be empty",
        statusCode: 400,
      });
    }

    const imagesArray = await MultipleFileUploader(images);

    const newProduct = new Product({
      name,
      description,
      category,
      stock,
      variants,
      tags,
      currency,
      metaTitle,
      metaDescription,
      brand,
      images: imagesArray,
      isActive,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      statusCode: 201,
      product: newProduct,
    });
  } catch (error) {
    console.log("Error creating product::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
