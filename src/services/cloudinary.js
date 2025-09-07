import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function MultipleFileUploader(images) {
  try {
    const uploadedImages = [];
    for (const image of images) {
      const uniqueName =
        Date.now() + Math.floor(Math.random() * 1000000) + "-" + image.name;
      const uploadPath = `./src/public/temp/${uniqueName}`;

      await image.mv(uploadPath);

      const result = await cloudinary.uploader.upload(uploadPath, {
        folder: "uploads",
        public_id: uniqueName,
        resource_type: "auto",
      });

      fs.unlinkSync(uploadPath);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return uploadedImages;
  } catch (error) {
    console.log("Error while uploading the image :::", error);
    throw error;
  }
}

export async function MultipleFileRemover(images) {
  try {
    for (const image of images) {
      await cloudinary.uploader.destroy(images.public_id, {
        resource_type: "auto",
      });

      return true;
    }
  } catch (error) {
    console.error("Error while removing the image :::", error);
    throw error;
  }
}

export const updateMultipleFiles = async (oldImages, newImages) => {
  try {
    if (oldImages && oldImages.length > 0) {
      await MultipleFileRemover(oldImages);
    }
    const uploadedImages = await MultipleFileUploader(newImages);
    return uploadedImages;
  } catch (error) {
    console.error("Error while updating the images :::", error);
    throw error;
  }
};
