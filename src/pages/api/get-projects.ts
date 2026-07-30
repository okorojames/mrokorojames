import connectDB from "@/libs/mongodb";
import Project from "@/models/project";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(403).json({ message: "Invalid request method" });
  }

  await connectDB();

  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 6, 1);

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find().sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(),
    ]);

    return res.status(200).json({
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong while fetching data",
    });
  }
}
