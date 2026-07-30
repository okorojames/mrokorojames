import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/libs/mongodb";
import Experience from "@/models/experience";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { company, position, product, from, to, description, technologies, companyLogo, companyUrl } = req.body;

    const maxOrderExperience = await Experience.findOne().sort({ order: -1 });
    const nextOrder = (maxOrderExperience?.order ?? -1) + 1;

    const newExperience = new Experience({
      company,
      position,
      product,
      from,
      to,
      description,
      technologies: technologies || [],
      companyLogo: companyLogo || "",
      companyUrl: companyUrl || "",
      order: nextOrder,
    });

    await newExperience.save();
    res.status(201).json({ message: "Experience created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
