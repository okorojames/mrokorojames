import connectDB from "@/libs/mongodb";
import Project from "@/models/project";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  await connectDB();
  const { id } = req.query;
  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  try {
    if (project.imageId) {
      await cloudinary.uploader.destroy(project.imageId);
    }
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
}
