import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX + TypeScript + JS file extensions
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Remove deprecated configs
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

// MDX wrapper (Next 16 compatible)
const withMDX = createMDX({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
});

export default withMDX(nextConfig);
