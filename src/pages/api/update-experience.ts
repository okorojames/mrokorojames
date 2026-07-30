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

  await connectDB();
  const { id } = req.query;
  const experience = await Experience.findById(id);
  if (!experience)
    return res.status(404).json({ message: "Experience not found" });

  try {
    const { company, position, product, from, to, description, technologies, companyLogo, companyUrl } = req.body;

    if (company !== undefined) experience.company = company;
    if (position !== undefined) experience.position = position;
    if (product !== undefined) experience.product = product;
    if (from !== undefined) experience.from = from;
    if (to !== undefined) experience.to = to;
    if (description !== undefined) experience.description = description;
    if (technologies !== undefined) experience.technologies = technologies;
    if (companyLogo !== undefined) experience.companyLogo = companyLogo;
    if (companyUrl !== undefined) experience.companyUrl = companyUrl;

    await experience.save();
    res.status(200).json({ message: "Experience updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
