import { Category } from "../models/category.models";

export const createCategory = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name required",
        statusCode: 400,
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists!",
        statusCode: 400,
      });
    }

    const slug = name
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/--+/g, "-")
      .replace(/\s+/g, "-")
      .split(" ")
      .join("-");

    const existingSlug = await Category.findOne({ slug });

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Category already exists!",
        statusCode: 400,
      });
    }

    const newCategory = new Category({
      name,
      slug,
      isActive,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category successfully created",
      statusCode: 201,
      data: newCategory,
    });
  } catch (error) {
    console.log("Error creating category::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        statusCode: 404,
      });
    }

    if (name) {
      category.name = name;
      category.slug = name
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
    }

    if (isActive !== undefined) {
      category.isActive = isActive;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated",
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    console.log("Error updating category::::", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
