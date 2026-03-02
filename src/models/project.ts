import mongoose, { Document, Model, Schema } from "mongoose";
import { IProject } from "@/types/project";

// Extend the shared type with Mongoose Document for model use
interface IProjectDocument extends Omit<IProject, "_id">, Document {}

const ProjectSchema: Schema<IProjectDocument> = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    stacks: { type: String, required: true },
    link: { type: String, required: true },
    github: { type: String, required: false, default: "" },
    image: { type: String, required: true },
    imageId: { type: String, required: true },
    topRated: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

const Project: Model<IProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default Project;
