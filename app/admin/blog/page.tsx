import { getBlogPostsAdmin } from "@/app/actions/admin"
import BlogManager from "@/components/admin/blog-manager"

export const revalidate = 0 // dynamically rendered

export default async function AdminBlogPage() {
  const posts = await getBlogPostsAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Blog Articles</h1>
        <p className="text-sm text-neutral-400">
          Compose and manage rich markdown stories, articles, and logs published on your portfolio blog.
        </p>
      </div>

      <BlogManager initialPosts={posts} />
    </div>
  )
}
