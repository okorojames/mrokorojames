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
  res: NextApiResponse,
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectDB();
  const { id } = req.query;
  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  try {
    const { name, desc, topRated, link, github, stacks, image } = req.body;
    const folderName = "uploads";
    // check if image is uploaded to destroy the previous image
    if (image && image !== project?.image) {
      if (project?.imageId) {
        await cloudinary.uploader.destroy(project?.imageId);
      }
      const img = await cloudinary.uploader.upload(image, {
        folder: folderName,
      });
      project.image = img?.secure_url;
      project.imageId = img?.public_id;
    }
    //update other fields
    project.name = name || project.name;
    project.desc = desc || project.desc;
    project.topRated = topRated !== undefined ? topRated : project.topRated;
    project.link = link || project.link;
    project.github = github !== undefined ? github : project.github;
    project.stacks = stacks || project.stacks;

    await project.save();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
    return;
  }
}
