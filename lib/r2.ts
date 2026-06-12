import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// Initialize S3 client for Cloudflare R2
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const R2_ENDPOINT = process.env.R2_ENDPOINT
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "portfolio"
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

export const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
})

/**
 * Uploads a file buffer to Cloudflare R2 and returns its public CDN URL.
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) {
    throw new Error("R2 storage is not configured. Missing environment variables.")
  }

  // Sanitize filename and create unique string
  const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_")
  const fileExt = cleanName.split(".").pop() || ""
  const uniqueName = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${fileExt}`

  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: uniqueName,
      Body: fileBuffer,
      ContentType: contentType,
    })
  )

  return `${R2_PUBLIC_URL}/${uniqueName}`
}
