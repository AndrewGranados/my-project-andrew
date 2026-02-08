"use server";

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadDashboardImage(file: File){
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{ secure_url: string}>((resolve, reject) => {
    cloudinary.uploader
    .upload_stream(
      {
        folder: "dashboard",
      },
      (error, result) => {
        if(error || !result){
          return reject(error);
        }

        resolve({
          secure_url: result.secure_url,
        });
      }
    )
    .end(buffer);
  });
}