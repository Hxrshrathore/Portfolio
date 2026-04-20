/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript + JS file extensions
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // Remove deprecated configs
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
