import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/libs/mongodb";
import Experience from "@/models/experience";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "items array is required" });
  }

  await connectDB();

  try {
    const operations = items.map(
      ({ _id, order }: { _id: string; order: number }) => ({
        updateOne: {
          filter: { _id },
          update: { $set: { order } },
        },
      }),
    );

    await Experience.bulkWrite(operations);

    res.status(200).json({ message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
