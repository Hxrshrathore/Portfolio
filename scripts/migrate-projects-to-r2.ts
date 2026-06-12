/**
 * migrate-projects-to-r2.ts
 * 
 * Uploads all project image files in public/projects/ to Cloudflare R2.
 * Updates NeonDB projects table rows with the new R2 CDN URLs.
 * Deletes the local files from public/projects/.
 * 
 * Usage: npx tsx scripts/migrate-projects-to-r2.ts
 */

import { config } from "dotenv"
import path from "path"
import fs from "fs"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { projects } from "../lib/db/schema"
import { eq, or } from "drizzle-orm"

// Load env variables
config({ path: ".env.local" })

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const R2_ENDPOINT = process.env.R2_ENDPOINT
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "portfolio"
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL
const DATABASE_URL = process.env.DATABASE_URL

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT || !R2_PUBLIC_URL) {
  console.error("❌ Error: R2 storage parameters are not fully set in .env.local")
  process.exit(1)
}

if (!DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is not set in .env.local")
  process.exit(1)
}

// Clients initialization
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

const sql = neon(DATABASE_URL)
const db = drizzle(sql)

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects")

async function main() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`❌ Error: Local projects directory does not exist: ${PROJECTS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(PROJECTS_DIR)
  const imageFiles = files.filter((file) =>
    /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file)
  )

  console.log(`-----------------------------------------------`)
  console.log(`🚀 PROJECT IMAGES R2 CDN MIGRATION`)
  console.log(`-----------------------------------------------`)
  console.log(`📍 Source:      ${PROJECTS_DIR}`)
  console.log(`📍 Files found:  ${imageFiles.length}`)
  console.log(`📍 Endpoint:    ${R2_ENDPOINT}`)
  console.log(`📍 Bucket:      ${R2_BUCKET_NAME}`)
  console.log(`📍 CDN URL:     ${R2_PUBLIC_URL}\n`)

  if (imageFiles.length === 0) {
    console.log("ℹ️ No images found in local folder. Nothing to migrate.")
    return
  }

  let successCount = 0
  let skipCount = 0
  let dbUpdatesCount = 0

  for (const filename of imageFiles) {
    const localFilePath = path.join(PROJECTS_DIR, filename)
    const stats = fs.statSync(localFilePath)

    // Check if it's a directory
    if (stats.isDirectory()) continue

    // Key format: projects/<filename>
    const r2Key = `projects/${filename}`
    
    // Construct CDN URL (URI encoded to handle spaces/special characters)
    const cdnUrl = `${R2_PUBLIC_URL}/projects/${encodeURIComponent(filename)}`
    
    // Old local path reference in Database
    const localDbPath = `/projects/${filename}`

    console.log(`⏳ Processing: "${filename}" (${(stats.size / 1024 / 1024).toFixed(2)} MB)`)

    try {
      // 1. Read file buffer
      const fileBuffer = fs.readFileSync(localFilePath)
      
      // Determine content type
      let contentType = "image/png"
      if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) contentType = "image/jpeg"
      else if (filename.endsWith(".svg")) contentType = "image/svg+xml"
      else if (filename.endsWith(".webp")) contentType = "image/webp"

      // 2. Upload to R2
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: r2Key,
          Body: fileBuffer,
          ContentType: contentType,
        })
      )

      console.log(`   └─ ✅ Uploaded to R2: key="${r2Key}"`)
      successCount++

      // 3. Update in Neon PostgreSQL Database
      // Find and update projects that use this image
      const affectedProjects = await db
        .select()
        .from(projects)
        .where(
          or(
            eq(projects.image, localDbPath),
            eq(projects.heroImage, localDbPath)
          )
        )

      if (affectedProjects.length > 0) {
        for (const proj of affectedProjects) {
          const updatedImage = proj.image === localDbPath ? cdnUrl : proj.image
          const updatedHeroImage = proj.heroImage === localDbPath ? cdnUrl : proj.heroImage

          await db
            .update(projects)
            .set({
              image: updatedImage,
              heroImage: updatedHeroImage,
              updatedAt: new Date(),
            })
            .where(eq(projects.id, proj.id))

          console.log(`   └─ 🗄️ Database row updated for Project ID: "${proj.id}"`)
          dbUpdatesCount++
        }
      }

      // 4. Delete local file
      fs.unlinkSync(localFilePath)
      console.log(`   └─ 🗑️ Deleted local file`)

    } catch (error: any) {
      console.error(`   └─ ❌ Migration failed for "${filename}": ${error.message}`)
    }
    console.log(`-----------------------------------------------`)
  }

  console.log(`\n🎉 Migration completed!`)
  console.log(`✅ Uploaded to CDN & deleted: ${successCount} files`)
  console.log(`🗄️ Database records updated: ${dbUpdatesCount} rows`)
}

main().catch((err) => {
  console.error("Fatal migration error:", err)
  process.exit(1)
})
