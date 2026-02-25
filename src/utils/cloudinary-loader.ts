import type { ImageLoaderProps } from "next/image";

export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // If the src is already a full Cloudinary URL, apply transformations
  if (src.includes("res.cloudinary.com")) {
    // Insert transformations before /upload/ or /fetch/
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      return `${parts[0]}/upload/w_${width},q_${quality || 75},f_auto/${parts[1]}`;
    }
  }
  // Fallback: return the src as-is
  return src;
};
