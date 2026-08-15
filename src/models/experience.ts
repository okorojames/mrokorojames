import mongoose, { Document, Model, Schema } from "mongoose";
import { IExperience } from "@/types/experience";

interface IExperienceDocument
  extends Omit<IExperience, "_id">,
    Document {}

const ExperienceSchema: Schema<IExperienceDocument> = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    product: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    description: { type: [String], required: true },
    technologies: { type: [String], default: [] },
    companyLogo: { type: String, required: false },
    companyUrl: { type: String, required: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

ExperienceSchema.index({ order: 1 });

const Experience: Model<IExperienceDocument> =
  mongoose.models.Experience ||
  mongoose.model<IExperienceDocument>("Experience", ExperienceSchema);

export default Experience;
