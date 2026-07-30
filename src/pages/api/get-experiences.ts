import connectDB from "@/libs/mongodb";
import Experience from "@/models/experience";
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
    const experiences = await Experience.find().sort({ order: 1 });

    return res.status(200).json({ data: experiences });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong while fetching data",
    });
  }
}
