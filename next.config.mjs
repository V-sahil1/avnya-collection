/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a production build run alongside `npm run dev` without clobbering its .next folder
  // (e.g. NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod npm start).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // 92 is reserved for the hero photography, which is shown large enough for 75 to soften it.
  images: { qualities: [75, 92] },
};

export default nextConfig;
