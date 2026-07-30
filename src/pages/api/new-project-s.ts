import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/libs/mongodb";
import Project from "@/models/project";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectDB();
  const cookies = req.headers.cookie || "";
  if (!cookies) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { name, desc, topRated, link, github, stacks, image } = req.body;
    const folderName = "uploads";
    const img = await cloudinary.uploader.upload(image, {
      folder: folderName,
    });
    console.log(typeof img?.public_id);
    const maxOrderProject = await Project.findOne().sort({ order: -1 });
    const nextOrder = (maxOrderProject?.order ?? -1) + 1;

    const newProject = new Project({
      name,
      desc,
      topRated,
      link,
      github,
      stacks,
      image: img?.secure_url,
      imageId: img?.public_id,
      order: nextOrder,
    });
    if (img) {
      await newProject.save();
    }
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
    return;
  }
}
