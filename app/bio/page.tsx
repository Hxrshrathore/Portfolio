import BioClient from "@/components/bio-client"
import { getFeaturedProjects } from "@/lib/projects-data"

export const metadata = {
  title: "Bio | Harsh Kumar",
  description: "Creative Developer & UI/UX Designer Bio Page",
}

export default async function BioPage() {
  const featuredProjects = await getFeaturedProjects()
  
  return <BioClient featuredProjects={featuredProjects} />
}
