import { Product } from "../models/product.models";
import {
  MultipleFileRemover,
  MultipleFileUploader,
  updateMultipleFiles,
} from "../services/cloudinary";

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
      [
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
      ].some((field) => !field && field !== 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        statusCode: 400,
      });
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Variants cannot be empty",
        statusCode: 400,
      });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images cannot be empty",
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

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        statusCode: 404,
      });
    }

    await MultipleFileRemover(product.images);
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.log("Error deleting product::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { images } = req.files || {};
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

    if (
      [
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
      ].some((field) => !field && field !== 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        statusCode: 400,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        statusCode: 404,
      });
    }
    let updatedImages = product.images;
    if (images && images.length > 0) {
      updatedImages = await updateMultipleFiles(product.images, images);
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.stock = stock;
    product.variants = variants;
    product.tags = tags;
    product.currency = currency;
    product.metaTitle = metaTitle;
    product.metaDescription = metaDescription;
    product.brand = brand;
    product.isActive = isActive;
    product.images = updatedImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      statusCode: 200,
      data: product,
    });
  } catch (error) {
    console.log("Error updating product::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
