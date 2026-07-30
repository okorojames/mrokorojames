import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/libs/mongodb";
import Experience from "@/models/experience";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { id } = req.query;
    await Experience.findByIdAndDelete(id);
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
